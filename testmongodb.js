var mongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/local'; //connection URL

//Use connect méthod to connect to the server
mongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Successfully connected to server");
    db.close(); 
});