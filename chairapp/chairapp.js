//
// General
var fs = require('fs');

//
// DB (mongoDB)
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').objectID;
var url = 'mongodb://localhost:27017/test';

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
            console.log('json format valid');
 
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

app.get('/dash', function(req, res) {
    fs.readFile('./public/dashboard.code', function (err, data) {

        if (err) throw err;

        console.log("a user connected to /dash");

        var htmldoc = data.toString();

        // access DB : attach json data here
        var dbObject = [];
        var findDash = function(db, callback) {
            var cursor = db.collection('dash').find();
            cursor.each(function(err, doc) {
                assert.equal(err, null);
                if (doc != null) {
                    dbObject.push(doc);
                } else {
                    htmldoc = htmldoc + "<script> var freqData = "
                        + JSON.stringify(dbObject)
                        + "; dashboard('#dashboard', freqData); </script>";

                    res.send(htmldoc);
                    callback();
                }
            });
        };

        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            findDash(db, function() {
                db.close();
            });
        });
            
    });
});

var httpServer = app.listen(3000, function () {

    var host = httpServer.address().address;
    var port = httpServer.address().port;
    
    console.log('HTTP app listening on port', 3000);
});

