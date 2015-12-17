angular
.module('cause-app')
.controller('ProjectsController', ProjectsController);

ProjectsController.$inject = ["Project", "User","$http", "CurrentUser", 'TokenService', 'Theme', '$stateParams']
function ProjectsController(Project, User, $http, CurrentUser, TokenService, Theme, $stateParams){
  var self = this;

  self.all     = [];
  self.users   = [];
  self.user    = {};
  self.userProjects = [];
  self.selectedProject = {}
  self.project = {};
  self.themes = []



  self.getUsers = function(){
    User.query(function(data){
      return self.users = data.users;
    });
  }

  self.getProjects = function(){
    Project.query(function(data){
      return self.all = data;
    })
  }


  if ($stateParams.id) projectShow();

  function projectShow(){
   Project.get({ id: $stateParams.id }, function(data){
     self.selectedProject = data;
     self.initialize(data);
   })
  }

  self.initialize = function(data) {
    console.log(data.latitude)
    var mapCanvas = document.getElementById('map');
    var mapOptions = {
      center: new google.maps.LatLng(data.latitude, data.longitude),
      zoom: 4,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    self.map = new google.maps.Map(mapCanvas, mapOptions)
    self.addPin(data);
  }

  self.addPin = function(data){
    var marker = new google.maps.Marker({
      position: {lat: data.latitude, lng: data.longitude},
      map: self.map
    })
  }

  self.alreadyAddedValues = function() {
    var themeArray = [];
    for (var i = 0; i < self.user.themes.length; i++) {
      themeArray.push(self.user.themes[i].name)
    };
    return themeArray;
  }

  self.themeFilter = function(item) {
    return !(self.alreadyAddedValues().indexOf(item.themeName) === -1);
  };


  self.getUser = function(){
    self.user = TokenService.decodeToken();
    User.get({id: self.user._id}, function(data){
      self.user = data.user
      self.userProjects = self.user.projects;
      self.userThemes = self.user.themes;
    })
  };


  self.checkProject = function(projectId){
    for (var i = 0; i < self.userProjects.length; i++) {
      if(self.userProjects[i]._id === projectId) return true
    };
    return false

  }

// self.checkUserThemes = function(userThemes){
//  return true
// }

self.addProjectToUser = function(project){
  var data = {
    projectId: project._id
  }
  User.addProject({id: self.user._id}, data, function(user){
    self.userProjects.push(project);
    self.checkProject(project._id)
  });
}

self.removeProjectFromUser = function(project){
  var data = {
    projectId: project._id
  }
  User.removeProject({id: self.user._id}, data, function(user){
    console.log(self.userProjects.indexOf(project))
    var index = self.userProjects.indexOf(project);
    self.userProjects.splice(index, 1);
    // self.checkProject(project._id)
  });
}

self.donateAmount = function(){

  console.log(self.user)
  
}


self.getProjects();
self.getUsers();
self.getUser();
}