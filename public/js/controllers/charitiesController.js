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
   self.addVoteToCharity = function (firstVote,secondVote,thirdVote,fourthVote){
    console.log(self.all[0])


    Charity.addVote({id: self.all[0]._id, amount:firstVote}, function(charity){
    });
    User.usersRemoveCredit({id: self.user._id, vote:firstVote})

    Charity.addVote({id: self.all[1]._id, amount:secondVote}, function(charity){
    });
    User.usersRemoveCredit({id: self.user._id, vote:secondVote})

    Charity.addVote({id: self.all[2]._id, amount:thirdVote}, function(charity){
    });
    User.usersRemoveCredit({id: self.user._id, vote:thirdVote})

    Charity.addVote({id: self.all[3]._id, amount:fourthVote}, function(charity){
    });
    User.usersRemoveCredit({id: self.user._id, vote:fourthVote})
   
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