var Charity    = require('../models/charity');

function charitiesIndex(req, res) {
  Charity.find(function(err, charity){
    if (err) return res.status(404).json({message: 'Something went wrong.'});
    res.status(200).send(charity);
  });
}

function charitiesCreate(req, res){
  console.log(req.body)
  var charity = new Charity(req.body);
  charity.save(function(err){
   if (err) return res.status(500).json({message: "Something went wrong!"});
   res.status(201).json({message: 'Charity successfully added.', charity: charity});
  });
}

function charitiesShow(req, res){
  Charity.findById(req.params.id)(function(err, charity){
    if (err) return res.status(404).json({message: 'Something went wrong.'});
    res.status(200).json({ charity: charity });
  });
}

function charitiesUpdate(req, res){
  Charity.findById(req.params.id,  function(err, charity) {
    if (err) return res.status(500).json({message: "Something went wrong!"});
    if (!charity) return res.status(404).json({message: 'No charity found.'});

    if (req.body.email) charity.local.email = req.body.name;
    if (req.body.password) charity.local.password = req.body.password;

    charity.save(function(err) {
     if (err) return res.status(500).json({message: "Something went wrong!"});

     res.status(201).json({message: 'charity successfully updated.', charity: charity});
   });
  });
}

function charitiesDelete(req, res){
  Charity.findByIdAndRemove({_id: req.params.id}, function(err){
   if (err) return res.status(404).json({message: 'Something went wrong.'});
   res.status(200).json({message: 'Charity has been successfully deleted'});
 });
}

module.exports = {
  charitiesIndex:  charitiesIndex,
  charitiesCreate: charitiesCreate,
  charitiesShow:   charitiesShow,
  charitiesUpdate: charitiesUpdate,
  charitiesDelete: charitiesDelete
}