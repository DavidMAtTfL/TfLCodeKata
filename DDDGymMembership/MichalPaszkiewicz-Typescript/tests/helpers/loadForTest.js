var fs = require("fs");
loadModule = function loadModule(moduleName) {
    var filePath = "../bin/" + "@" + moduleName + ".js";
    var fileText = fs.readFileSync(filePath, "utf-8");
    return fileText;
};
