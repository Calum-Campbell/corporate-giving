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


  // GETs all the users from the api
  function getUsers() {
    User.query(function(data){
     return self.all = data.users;
   });
  }

  //GETs current user
  function getUser(){
    self.user = TokenService.decodeToken();
    User.get({id: self.user._id}, function(data){
      // console.log(data.user)
      self.user = data.user
     })
    };

  // Actions to carry once register or login forms have been submitted
  function handleLogin(res) {
    var token = res.token ? res.token : null;
    if (token) {
      getUsers();
      $state.go('themes');
    }
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
  }

return self
}