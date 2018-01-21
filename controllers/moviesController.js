var movies = require('./movieData');
var dbService= require('../services/dbService');


exports.getAllMovies = function(req, res,next){
  var db=dbService.database;

var moviesCollection = db.collection("movies");

moviesCollection.find().toArray().then(function(result){
  var outputJSON={
    "isSuccess":true,
    "data":result
  }
  return res.json(outputJSON);
});

};

exports.addNewMovie = function(req,res,next){

  var db = dbService.database
  ,movie = req.body
  ,moviesCollection =db.collection("movies");


moviesCollection.insert(movie).then(function(save_data){
  return res.json({
    "isSuccess":true
  });
});

}
