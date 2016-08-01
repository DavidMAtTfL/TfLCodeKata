declare function require(fileName: string): any;
declare var loadModule;

var fs = require("fs");

loadModule = function loadModule(moduleName: string): string{
    var filePath = "../bin/" + "@" + moduleName + ".js";
    var fileText = fs.readFileSync(filePath, "utf-8");
    return fileText;
};