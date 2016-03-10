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
    console.log(firstVote)

    var firstVote = parseInt(firstVote);
    if(firstVote === parseInt(firstVote, 10)){
      console.log("jello")
    Charity.addVote({id: self.all[0]._id, amount:parseInt(firstVote)}, function(charity){
    });
    User.usersRemoveCredit({id: self.user._id, vote:parseInt(firstVote)})
  }

    Charity.addVote({id: self.all[1]._id, amount:parseInt(secondVote)}, function(charity){
    });
    User.usersRemoveCredit({id: self.user._id, vote:parseInt(secondVote)})

    Charity.addVote({id: self.all[2]._id, amount:parseInt(thirdVote)}, function(charity){
    });
    User.usersRemoveCredit({id: self.user._id, vote:parseInt(thirdVote)})

    Charity.addVote({id: self.all[3]._id, amount:parseInt(fourthVote)}, function(charity){
    });
    User.usersRemoveCredit({id: self.user._id, vote:parseInt(fourthVote)})
   
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

   // self.ui = function(){
   //  $( ".slider0" ).slider({
   //    range: "min",
   //    min: 0,
   //    max: 100,
   //    value: 60,
   //    slide: function( event, ui ) {
   //            $( "#slider0" ).val( ui.value );
   //            // self.checkCredit(ui.value);
   //          }
   //    });
   //  $( ".slider1" ).slider({
   //    range: "min",
   //    min: 0,
   //    max: 100,
   //    value: 60,
   //    slide: function( event, ui ) {
   //            $( "#slider1" ).val( ui.value );
   //            // self.checkCredit(ui.value);
   //          }
   //    });
   //  $( ".slider2" ).slider({
   //    range: "min",
   //    min: 0,
   //    max: 100,
   //    value: 60,
   //    slide: function( event, ui ) {
   //            $( "#slider2" ).val( ui.value );
   //            // self.checkCredit(ui.value);
   //          }
   //    });
   //  $( ".slider3" ).slider({
   //    range: "min",
   //    min: 0,
   //    max: 100,
   //    value: 60,
   //    slide: function( event, ui ) {
   //            $( "#slider3" ).val( ui.value );
   //            // self.checkCredit(ui.value);
   //          }
   //    });
   //  };

    // self.checkCredit = function(value){
    //   var userCredit = self.user.local.credit;
    //   var remainingCredit = (userCredit - value);
    //   $( "#left" ).val( remainingCredit );
    // };  

 
   // self.ui();
   self.getCharities();
   self.getUser();
   self.getUsers();
  }