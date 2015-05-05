//
// DB (mongoDB)
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

//
// TCP
// TCP receives sensor data from Android and keep stores that in DB.
var tcpServer = require('net').createServer(function(socket) {
    
    // welcome
    console.log('new connection');
    socket.setEncoding('utf8');
    socket.write("Type 'quit' to exit.\n");

    // process sensor data
    socket.on('data', function(data) {

        try {
            JSON.parse(data.trim().toString())
 
            var sensorData = JSON.parse(data.trim().toString());
            console.log( sensorData );

            // save mongoDB

       } catch (e) {
            console.log("data dropped (not json)");
       }

        if(data.trim().toLowerCase() === 'quit') {
            socket.write('Bye');
            return socket.end();
        }
    });

    // bye
    socket.on('end',function() {
        console.log('Client connection ended');
    });

}).listen(9074, function () {
    
    console.log('TCP app listening on port', 9074);

});

//
// HTTP (Express)
// HTTP provides web view for the service 
var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.send('Hello World!');
});

var httpServer = app.listen(3000, function () {

    var host = httpServer.address().address;
    var port = httpServer.address().port;
    
    console.log('HTTP app listening on port', 3000);
});

