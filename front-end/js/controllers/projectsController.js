angular
.module('cause-app')
.controller('ProjectsController', ProjectsController);

ProjectsController.$inject = ["Project", "User","$http"]
function ProjectsController(Project, User, $http){
  var self = this;

  self.all     = [];
  self.users   = [];
  self.project = {}; 

  // self.newProject = {};
  // self.projects = Project.query();

  self.consoleProject = function(){
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
    console.log(newProjectObject)
    var project = { project: newProjectObject }
    Project.save(project, function(data){
      console.log(project)
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

 self.add = function(){
  var project = { project: self.project }
  Project.save(project, function(data){
    self.all.push(data);
    self.project = {};
  })
}
self.consoleProject();
self.getProjects();
self.getUsers();

}