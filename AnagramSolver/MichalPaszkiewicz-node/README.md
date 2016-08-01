anagram solver
---------------------------

to run:

0. download this stuff
1. install node
2. run anagramFinder.js like so:

    `node anagramFinder.js some words 6`

The program will find anagrams of all the words after "anagramFinder.js"

The number at the end of this command will set the minimum size of the first word (if you run a long string, you want this number to be high, otherwise the program will find loads of permutations of short strings and may take FOREVER!)

If you do not provide a number, it will be automaticall set to `Math.floor(anagramString.length / 2);`

Enjoy!
