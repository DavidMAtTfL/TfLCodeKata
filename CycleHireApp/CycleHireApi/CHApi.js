var express = require('express');
var webApi = require('node-web-api');

function ApiController(){ //Route "/Api"

    this.getDocks = function(req, res){ 

        var DockingStations = GetDockList()

        res.json(DockingStations);
    }
}

function GetDockList(){
    var DockingStations = [ 
        { Name: "London Eye", Latitude: 51.5033, Longitude: 0.1195, Bikes: 4, Docks: 4 },
        { Name: "St James' Park", Latitude: 51.4996, Longitude: 0.1333, Bikes: 2, Docks: 6 } 
        ]; 

        return DockingStations;
}

app = express();
 
webApi.register(app, [ApiController])
 
app.listen(8000, function(){
  console.log('Server started at port 8000.');
});