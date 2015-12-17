angular
  .module('cause-app')
  .controller('UsersController', UsersController);

UsersController.$inject = ['User', 'TokenService', '$state', 'CurrentUser'];
function UsersController(User, TokenService, $state, CurrentUser){

  var self = this;

  self.all           = [];
  self.user          = {};
  self.getUsers      = getUsers;
  self.register      = register;
  self.login         = login;
  self.logout        = logout;
  self.checkLoggedIn = checkLoggedIn;
  // self.checkProject  = checkProject;


  // self.authenticate = function(provider) {
  //   $auth.authenticate(provider);
  // };

  // GETs all the users from the api
  function getUsers() {
    User.query(function(data){
     return self.all = data.users;
   });
  }

  function getUser(){
    self.user = TokenService.decodeToken();
    User.get({id: self.user._id}, function(data){
      // console.log(data.user)
      self.user = data.user
     })
    };

  //   function checkProject(projectId){
  //     for (var i = self.user.projects.length - 1; i >= 0; i--) {
  //       console.log(self.user.projects[i])
  //       if(self.user.projects[i] === projectId){
  //         return true
  //     }else{
  //       return false
  //     }
  //   }
  // }
  

  // Actions to carry once register or login forms have been submitted
  function handleLogin(res) {
    var token = res.token ? res.token : null;
    if (token) {
      getUsers();
      $state.go('themes');
    }
    // console.log(res);
    self.user = TokenService.decodeToken();
    CurrentUser.saveUser(self.user)
  }

  // POSTS the new user to register to the API
  function register() {
    console.log(self.user)
    User.register(self.user, handleLogin);
  }

  // POSTS the new user to login to the API
  function login() {
    User.login(self.user, handleLogin);
  }

  // A function to remove token form local storage and log user out
  function logout() {
    TokenService.removeToken();
    self.all  = [];
    self.user = {};
    CurrentUser.clearUser();
  }

  // Checks if the user is logged in
  function checkLoggedIn() {
    var loggedIn = !!TokenService.getToken();
    return loggedIn;
  }

  // Checks if the user is logged in, runs every time the page is loaded
  if (CurrentUser.getUser()) {
    getUser();
    // self.user = TokenService.decodeToken();
    // console.log(self.user)
  }

return self
}