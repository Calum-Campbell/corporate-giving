var Charity = require("../models/charity");
var config   = require("../config/config");
var mongoose = require("mongoose");


var mongoUri =  config.database

mongoose.connect(mongoUri);


var newCharity1 = new Charity() 

newCharity1.name = "Save earth";
newCharity1.votes = [];
newCharity1.save(function(err){

  if (err) return res.status(500).json({message: "Something went wrong!"});

  res.status(201).json({message: 'Charity successfully added.'});
})
var newCharity2 = new Charity() 

newCharity2.name = "Oxfam";
newCharity2.votes = [];
newCharity2.save(function(err){

  if (err) return res.status(500).json({message: "Something went wrong!"});

  res.status(201).json({message: 'Charity successfully added.'});
})
var newCharity3 = new Charity() 

newCharity3.name = "Sustrans";
newCharity3.votes = [];
newCharity3.save(function(err){

  if (err) return res.status(500).json({message: "Something went wrong!"});

  res.status(201).json({message: 'Charity successfully added.'});
})
var newCharity4 = new Charity() 

newCharity4.name = "Amnesty";
newCharity4.votes = [];
newCharity4.save(function(err){

  if (err) return res.status(500).json({message: "Something went wrong!"});

  res.status(201).json({message: 'Charity successfully added.'});
})


