var Company    = require('../models/company');

function companiesIndex(req, res) {
  Company.find(function(err, companies){
    if (err) return res.status(404).json({message: 'Something went wrong.'});
    res.status(200).json({ companies: companies });
  });
}

function companiesShow(req, res){
  Company.findById(req.params.id, function(err, company){
    if (err) return res.status(404).json({message: 'Something went wrong.'});
    res.status(200).json({ company: company });
  });
}

function companiesCreate(req, res){
  var company = new Company(req.body);
  company.save(function(err){
   if (err) return res.status(500).json({message: "Something went wrong!"});
   res.status(201).json({message: 'Company successfully added.', company: company});
  });
}

function companiesUpdate(req, res){
  Company.findById(req.params.id,  function(err, company) {
    if (err) return res.status(500).json({message: "Something went wrong!"});
    if (!company) return res.status(404).json({message: 'No company found.'});

    if (req.body.name) company.local.name = req.body.name;

    company.save(function(err) {
     if (err) return res.status(500).json({message: "Something went wrong!"});

     res.status(201).json({message: 'company successfully updated.', company: company});
   });
  });
}

function companiesDelete(req, res){
  Company.findByIdAndRemove({_id: req.params.id}, function(err){
   if (err) return res.status(404).json({message: 'Something went wrong.'});
   res.status(200).json({message: 'Company has been successfully deleted'});
 });
}

module.exports = {
  companiesIndex:  companiesIndex,
  companiesShow:   companiesShow,
  companiesUpdate: companiesUpdate,
  companiesDelete: companiesDelete,
  companiesCreate: companiesCreate
}










