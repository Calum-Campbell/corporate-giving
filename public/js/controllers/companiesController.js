angular
  .module('corporate-giving')
  .controller('CompaniesController', CompaniesController);

  CompaniesController.$inject = ['Company','Charity','User', 'TokenService','$stateParams','CurrentUser'];
  function CompaniesController(Company,Charity, User, TokenService, $stateParams, CurrentUser){
    var self = this;

   self.all             = [];
   self.companies           = [];
   self.company            = {};


   self.getCompanies = function(){
     Company.query(function(data){
       return self.companies = data.companies;
     });
   }

   self.getCompany = function(){
     Company.get({id: self.company._id}, function(data){
       self.company = data.company
     })
   };

 
   self.getCompanies();
   self.getCompany();
  }