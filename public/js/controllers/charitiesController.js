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
      self.startD3(data);
       return self.all = data;
     })
   }; 

   //Voting with Charities
   self.addVoteToCharity = function (firstVote,secondVote,thirdVote,fourthVote){
    console.log(thirdVote)

    var firstVote = parseInt(firstVote);
    var secondVote = parseInt(secondVote);
    var thirdVote = parseInt(thirdVote);
    var fourthVote = parseInt(fourthVote);

    if(firstVote === parseInt(firstVote, 10)){
      console.log("doing first")
    Charity.addVote({id: self.all[0]._id, amount:parseInt(firstVote)}, function(charity){
    });
    User.usersRemoveCredit({id: self.user._id, vote:parseInt(firstVote)})
   }

   if(secondVote === parseInt(secondVote, 10)){
    console.log("doing second")
    Charity.addVote({id: self.all[1]._id, amount:parseInt(secondVote)}, function(charity){
    });
    User.usersRemoveCredit({id: self.user._id, vote:parseInt(secondVote)})
  }

  if(thirdVote === parseInt(thirdVote, 10)){
    console.log("doing third")

    Charity.addVote({id: self.all[2]._id, amount:parseInt(thirdVote)}, function(charity){
    });
    User.usersRemoveCredit({id: self.user._id, vote:parseInt(thirdVote)})
  }

  if(fourthVote === parseInt(fourthVote, 10)){
    console.log("doing fourth")

    Charity.addVote({id: self.all[3]._id, amount:parseInt(fourthVote)}, function(charity){
    });
    User.usersRemoveCredit({id: self.user._id, vote:parseInt(fourthVote)})
   }

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

 // D3 Tings/////////////////////////////////////////////////////////////////////////////////

 self.startD3 = function(charities){

  var w = 300,                        //width
  h = 300,                            //height
  r = 100,                            //radius
  color = d3.scale.category20b();     //builtin range of colors

  // data = [{"label":"one", "value":12}, 
  //         {"label":"two", "value":50}, 
  //         {"label":"three", "value":30}];
  data = [];

  for (var i = 0; i < charities.length; i++) {

    var charitiesVotes = charities[i].votes;
    var charitiesVotesTotal = 0;
    $.each(charitiesVotes,function() {
        charitiesVotesTotal += this;
    });

    var chartObj = {
      "label": charities[i].name,
      "value": charitiesVotesTotal
    };
    data.push(chartObj);
  }

  var vis = d3.select("#pieChart")
      .append("svg:svg")              //create the SVG element inside the <body>
      .data([data])                   //associate our data with the document
          .attr("width", w)           //set the width and height of our visualization (these will be attributes of the <svg> tag
          .attr("height", h)
      .append("svg:g")                //make a group to hold our pie chart
          .attr("transform", "translate(" + r + "," + r + ")")    //move the center of the pie chart from 0, 0 to radius, radius

  var arc = d3.svg.arc()              //this will create <path> elements for us using arc data
      .outerRadius(r);

  var pie = d3.layout.pie()           //this will create arc data for us given a list of values
      .value(function(d) { return d.value; });    //we must tell it out to access the value of each element in our data array

  var arcs = vis.selectAll("g.slice")     //this selects all <g> elements with class slice (there aren't any yet)
      .data(pie)                          //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties) 
      .enter()                            //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
          .append("svg:g")                //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
              .attr("class", "slice");    //allow us to style things in the slices (like text)

      arcs.append("svg:path")
              .attr("fill", function(d, i) { return color(i); } ) //set the color for each slice to be chosen from the color function defined above
              .attr("d", arc);                                    //this creates the actual SVG path using the associated data (pie) with the arc drawing function

      arcs.append("svg:text")                                     //add a label to each slice
              .attr("transform", function(d) {                    //set the label's origin to the center of the arc
              //we have to make sure to set these before calling arc.centroid
              d.innerRadius = 0;
              d.outerRadius = r;
              return "translate(" + arc.centroid(d) + ")";        //this gives us a pair of coordinates like [50, 50]
          })
          .attr("text-anchor", "middle")                          //center the text on it's origin
          .text(function(d, i) { return data[i].label; });        //get the label from our original data array
      
 }



   // self.ui();
   // self.startD3();
   self.getCharities();
   self.getUser();
   self.getUsers();
  }