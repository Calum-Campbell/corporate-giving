
angular
  .module('corporate-giving')
  .controller('CharitiesController', CharitiesController);

  CharitiesController.$inject = ['Charity','User', 'TokenService','$stateParams','CurrentUser'];
  function CharitiesController(Charity, User, TokenService, $stateParams, CurrentUser){
    var self = this;

   self.all             = [];
   self.users           = [];
   self.user            = {};
   self.userCharities   = [];
   self.selectedCharity = {}
   self.charity         = {};

   self.getUsers = function(){
     User.query(function(data){
       return self.users = data.users;
     });
   }

   self.getUser = function(){
     self.user = TokenService.decodeToken();
     User.get({id: self.user._id}, function(data){
       self.user = data.user
     })
   };

   self.getCharities = function(){
     Charity.query(function(data){
       return self.all = data;
     })
   }; 

   //Voting with Charities
   self.addVoteToCharity = function (charity){
      charity.votes.push(1);
      var data = {
        charityId : charity._id
      }
      Charity.addVote({id: charity._id}, data,function(charity){
        console.log("hell");
      });
   };

   if ($stateParams.id) charityShow();

   function charityShow(){
    Charity.get({ id: $stateParams.id }, function(data){
      self.selectedCharity = data;
    })
   };

 

   self.getCharities();
   self.getUser();
   self.getUsers();
  }