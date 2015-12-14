angular
.module('cause-app')
.controller('ProjectsController', ProjectsController);

ProjectsController.$inject = ["Project", "User","$http", "CurrentUser", 'TokenService']
function ProjectsController(Project, User, $http, CurrentUser, TokenService){
  var self = this;

  self.all     = [];
  self.users   = [];
  self.user    = {};
  self.project = {};



//   self.getLoopProjects = function(projectId){
//     $http({
//       method: 'GET',
//       url: 'https://api.globalgiving.org/api/public/projectservice/countries/GB/projects/active?api_key=a310a8b0-2e3a-4c23-aedf-ec13bf0e00a3&nextProjectId='+projectId+'',
//       headers: {
//         'Accept': 'application/json'
//       }
//     }).then(function(response){
//       console.log(response)
//       self.checkLoopProjects(response)
//   })
// }

//   self.checkLoopProjects = function(response){
//     if (response.data.projects.hasNext){
//       console.log("more to come")
//       self.getLoopProjects(response.data.projects.nextProjectId)
//     }else{
//       console.log("finished!")
//     }
//   }

self.getWebProject = function(){
  $http({
    method: 'GET',
    url: 'https://api.globalgiving.org/api/public/projectservice/countries/GB/projects/active?api_key=a310a8b0-2e3a-4c23-aedf-ec13bf0e00a3&nextProjectId=8992',
    headers: {
      'Accept': 'application/json'
    }
  }).then(function(response){
    var projects = response.data.projects.project
    for (var i = projects.length - 1; i >= 0; i--) {
      self.addWebProject(projects[i])
    };
  })
}


self.addWebProject = function(projectData){
  var newProjectObject = {
    title: projectData['title'],
    need: projectData['need'],
    themeName: projectData['themeName'],
    summary: projectData['summary'],
    imageLink: projectData['imageLink'],
  }
  var project = { project: newProjectObject }
  Project.save(project, function(data){
   self.all.push(data);
   self.project = {};
 })
}


self.getProjects = function(){
  Project.query(function(data){
    return self.all = data;
  })
}

self.getUsers = function(){
 User.query(function(data){
  return self.users = data.users;
});
}

//  self.add = function(){
//   var project = { project: self.project }
//   Project.save(project, function(data){
//     self.all.push(data);
//     self.project = {};
//   })
// }

self.checkProject = function(projectId){
  for (var i = self.user.projects.length - 1; i >= 0; i--) {
    console.log(self.user.projects[i])
    if(self.user.projects[i] === projectId){
      return true
  }else{
    return false
  }
}
}

self.addProjectToUser = function(project){
  self.user = TokenService.decodeToken();
  var data = {
    projectId: project._id
  }
  console.log(data)
  User.addProject({id: self.user._id}, data, function(user){
    // self.checkProject(project._id)
    self.getProjects();
  });
}

self.getUser = function(){
  self.user = TokenService.decodeToken();
  User.get({id: self.user._id}, function(data){
    console.log(data.user)
    self.user = data.user
   })
  };


self.removeProjectFromUser = function(project){
  self.user = TokenService.decodeToken();
  var data = {
    projectId: project._id
  }
  console.log(data)
  User.removeProject({id: self.user._id}, data, function(user){
    // self.checkProject(project._id)
  });
}

// self.getLoopProjects(8992);
// self.getWebProject();

self.getProjects();
self.getUsers();
self.getUser();

}