var fs = require("fs");

String.prototype.every = function(fn){
	for(var i = 0; i < this.length; i++){
		if(!fn(this[i])){
			return false;
		}
	}
	return true;
}

// minimumStringLength to ensure no useless short word permutations
var _minStringLength;
function getAnagramString(){
	var anagramString = "";
	for(var i = 2; i < process.argv.length; i++){
		if(isNaN(process.argv[i])){
			anagramString += process.argv[i];
		}
		else if(process.argv[i] != 0){
			_minStringLength = process.argv[i];
		}
	}
	if(!_minStringLength || _minStringLength > anagramString.length){
		_minStringLength = Math.floor(anagramString.length / 2);
	}
	console.log("_minStringLength set to " + _minStringLength);
	
	return anagramString;
}

var _allTheRealWords;
function getWordsOfLength(anagramLength, anagramString){
	if(!_allTheRealWords){
		var fileString = fs.readFileSync("allthewords.txt", "utf-8");
		// first call should have the maximum anagramLength, so we can filter out all the words that are too long.
		// can filter out all words that are not in anagramString to increase speed.
		_allTheRealWords = fileString.split("\r\n")
			.filter(function(word){ return word.length <= anagramLength; })
			.filter(function(word){ return lettersAreInWord(word, anagramString); });
	}
	return _allTheRealWords.filter(function(word){ return word.length == anagramLength; });
}

function lettersAreInWord(letters, word){
	return letters.every(function(letter){
		var isInside = word.indexOf(letter) != -1;
		word = word.replace(letter,"");		
		return isInside;		
	});
}

function allLettersMatch(word1, word2){
	return word1.split("").sort().join("") === word2.split("").sort().join("");
}

function outputAnagrams(anagrams){
	fs.writeFileSync("anagrams.txt", anagrams.join("\r\n"));
	anagrams.forEach(function(anagram){
		console.log(anagram);
	});
}

function getUnusedLetters(shortWord, longWord){
	for(var i = 0; i < shortWord.length; i++){
		longWord = longWord.replace(shortWord[i],"");
	}
	return longWord;
}

function getAnagrams(anagramString, anagrams, isTopLevel){
	// minimumStringLength to ensure no useless short word permutations
	var minimumStringLength = isTopLevel ? _minStringLength : Math.min(3, anagramString.length);
	for(var i = anagramString.length; i >= minimumStringLength; i--){
		var words = getWordsOfLength(i, anagramString).filter(function(word){
			return lettersAreInWord(word, anagramString);
		});	
		
		if(words.length == 0){ continue; }
		
		words.forEach(function(word){
			if(anagramString.length === word.length){		
				anagrams.push(word);
			}
			else{
				var unusedLetters = getUnusedLetters(word, anagramString);
				var partialAnagrams = getAnagrams(unusedLetters, []);
				if(partialAnagrams.length == 0){ return; }
				partialAnagrams.forEach(function(partialAnagram){
					anagrams.push(word + " " + partialAnagram);
				});
			}
		})
	}
	return anagrams;
}

(function main(){
	if(process.argv[2] == null){
		console.log("no words have been passed into the anagram solver");
		return;
	}
	var anagramString = getAnagramString();
	var anagrams = getAnagrams(anagramString, [], true);
	outputAnagrams(anagrams);
})();
