var Theme = require("../models/theme");

function themesIndex(req, res){
  Theme.find({}, function(err, themes) {
    if (err) return res.status(404).send(err);
    res.status(200).send(themes);
  });
}

function themesCreate(req, res){
  var theme = new Theme(req.body);
  theme.save(function(err){
   if (err) return res.status(500).json({message: "Something went wrong!"});
   res.status(201).json({message: 'Theme successfully added.', theme: theme});
  });
}

module.exports = {
  themesIndex:  themesIndex,
  themesCreate: themesCreate
}