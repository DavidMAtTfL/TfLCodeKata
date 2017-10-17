var NATS = require('nats');
var nats = NATS.connect();

var currentPosition = 1;
var id = Math.floor(1000 * Math.random());

console.log("Train " + id + " started");

nats.subscribe('train', function(message) {
    var msg = JSON.parse(message);
    switch(msg.type){
        case "report":
            nats.publish("train", JSON.stringify({type:"message",message: id + ": " + currentPosition}));
            return;
        case "move":
            if(msg.trainId == id){
                console.log("moved to: " + msg.position);
                currentPosition = msg.position;
                nats.publish("train", JSON.stringify({type:"message",message:"moved " + id + " to " + currentPosition}));
                return;
            }
            if(msg.position == currentPosition){
                console.log("TRAIN CRASH");
                nats.publish("train", JSON.stringify({type:"message",message:"TRAIN CRASH"}));
            }
            return;
    }
});