var MongoClient = require('mongodb').MongoClient;


exports.createConnection = function(){
  MongoClient.connect("mongodb://arvinth:arvinth@ds211088.mlab.com:11088/projector").then(function(client){
    console.log("mongodb is connected");
    exports.database=client.db("projector");
  });
}
