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
   self.selectedCharity = {};
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
   self.addVoteToCharity = function (charity, amount){
    console.log(charity)
    console.log(amount)
    console.log(self.user)
    charity.votes.push(amount);
    self.user.local.credit -= amount;
    self.checkCredit();

    Charity.addVote({id: charity._id, amount:amount}, function(charity){
    });

    User.usersRemoveCredit({id: self.user._id, vote:amount})
   
   };

   self.getTotalVotes = function(charity){
    var voteArray = charity.votes;
    var total = 0;
    $.each(voteArray,function() {
        total += this;
    });
    // console.log(total)
    self.charity.total = total;
    return total;
   };


   if ($stateParams.id) charityShow();

   function charityShow(){
    Charity.get({ id: $stateParams.id }, function(data){
      self.selectedCharity = data;
    })
   };

   self.ui = function(){
    $( ".slider" ).slider({
      orientation: "vertical",
      range: "min",
      min: 0,
      max: 100,
      value: 60,
      slide: function( event, ui ) {
              $( "#donate" ).val( ui.value );
              self.checkCredit(ui.value);
            }
      });
    };

    self.checkCredit = function(value){
      var userCredit = self.user.local.credit;
      var remainingCredit = (userCredit - value);
      $( "#left" ).val( remainingCredit );
    };  

 
   self.ui();
   self.getCharities();
   self.getUser();
   self.getUsers();
  }