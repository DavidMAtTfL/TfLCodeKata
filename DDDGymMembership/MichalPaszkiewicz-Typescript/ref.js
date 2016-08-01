// ref.js
var fs = require("fs"), util = require("util"), exec = require("child_process").execSync;
var copy = function (filePathFrom) {
    console.log("copying " + filePathFrom);
    function to(filePathTo) {
        console.log("to " + filePathTo + "\r\n");
        var text = fs.readFileSync(filePathFrom, "utf-8");
        fs.writeFileSync(filePathTo, text);
    }
    return {
        to: to
    };
};

var deleteFolderRecursive = function(path) {
    var files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

function runTSC(path){
    console.log("building " + path + " ...\r\n");
    if(path.indexOf("test") == -1){
        var cmdScript = "cd " + path + " & " + "tsc --declaration & cd ..";
    }
    exec(cmdScript);
}

var update = function () {
    var allPaths = fs.readdirSync(".");
    
    var binPaths = allPaths.filter((p) => {
        return p == "bin";
    });
    
    if(binPaths.length > 0){
        console.log("cleaning solution");
        console.log("removing bin folder ...");
        deleteFolderRecursive("./bin");
    }
    
    var dirPaths = allPaths.filter((p) => {
       return p != "bin" && fs.lstatSync(p).isDirectory(); 
    });
    
    dirPaths.forEach((p) => {
        console.log("cleaning " + p + " ...");
        
        var localPaths = fs.readdirSync(p);
        var binPaths = localPaths.filter((pp) => { return pp == "bin"; });
        var tsconfigPaths = localPaths.filter((pp) => { return pp.indexOf(".tsconfig") != -1; })
        
        if(binPaths.length > 0){
            console.log("removing bin folder ...");
            deleteFolderRecursive(p + "/bin");  
        }     
    });    
    
    //read refs.refs file and remove all whitespace
    var refsFile = fs.readFileSync("refs.refs","utf-8").replace(/ /g, "").replace(/\t/g,"");
    
    var lines = refsFile.replace(/\n/g,";").replace(/;;/g,";").split(";")
        .map(function(ref){
            if(ref.indexOf("//") != -1){ return ref.substr(0, ref.indexOf("//")); }
            return ref.replace(/\r|\n/g,"");
        })        
        .filter(function(ref){return ref.replace(/\s/g,"").length > 0;});        

    var tscs = {};
    
    for(var i = 0; i < lines.length; i++){        
        var splitLine = lines[i].split("<==");
        var proj = splitLine[0];

        var refs = splitLine[1].split(",");
        
        var binDirectory = "./" + proj + "/bin";
        
        if(!fs.existsSync(binDirectory)){
            fs.mkdirSync(binDirectory);
        }
        for(var j = 0; j < refs.length; j++){
            if(tscs[refs[j]]==null){
                runTSC(refs[j]);
                tscs[refs[j]]="ran";
            }
            copy("./bin/@" + refs[j] + ".d.ts").to(binDirectory + "/@" + refs[j] + ".d.ts");
        }

        runTSC(proj);
        tscs[proj]="ran";
    }
};
exports.copy = copy;
exports.update = update;
