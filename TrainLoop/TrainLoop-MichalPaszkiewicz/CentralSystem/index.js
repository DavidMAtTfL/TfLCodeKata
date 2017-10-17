var NATS = require("nats");
var nats = NATS.connect();

nats.subscribe('train', function(message) {
    var msg = JSON.parse(message);
    switch(msg.type){
        case "message":
            console.log(msg.message);
    }
});

switch(process.argv[2]){
    case "report": 
        nats.publish("train", JSON.stringify({type:"report"}));
        return;
    case "move":
        if(process.argv[3] == null){
            console.log("No argument for id given");
            return;
        }
        if(process.argv[4] == null){
            console.log("No argument for position given");
            return;
        }
        nats.publish("train", JSON.stringify({
            type:"move", 
            trainId: process.argv[3], 
            position: process.argv[4]
        }));
        return;
}

