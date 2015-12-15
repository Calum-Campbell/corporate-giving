angular
.module('cause-app')
.controller('ThemesController', ThemesController);

ThemesController.$inject = ["Theme","$http", "User", "CurrentUser", 'TokenService']

function ThemesController(Theme, $http, User, CurrentUser, TokenService){
  var self = this;

  self.all     = [];
  self.themes   = [];
  self.user    = {};
  self.theme    = {};
  self.userThemes = [];


  self.getWebThemeNames = function(){
    $http({
      method: 'GET',
      url: 'https://api.globalgiving.org/api/public/projectservice/themes?api_key=a310a8b0-2e3a-4c23-aedf-ec13bf0e00a3',
      headers: {
        'Accept': 'application/json'
      }
    }).then(function(response){
      var themes = response.data.themes
      console.log(themes.theme.length)
      for (var i = themes.theme.length - 1; i >= 0; i--) {
        self.addWebTheme(themes.theme[i])
      };
    })
  }

  self.addWebTheme = function(themeData){
    var newThemeObject = {
      name: themeData['name'],
    }
    console.log(newThemeObject)
    var theme = { theme: newThemeObject }
    Theme.save(theme, function(data){
     self.all.push(data);
     self.theme = {};
   })
  }

  self.getUsers = function(){
   User.query(function(data){
    return self.users = data.users;
  });
  }

  self.getThemes = function(){
    Theme.query(function(data){
      return self.all = data;
    })
  }

  self.getUser = function(){
    self.user = TokenService.decodeToken();
    User.get({id: self.user._id}, function(data){
      console.log("GETTING USERS AGAIN")
      self.user = data.user
      self.userThemes = self.user.themes;
    })
  };

  self.checkTheme = function(themeId){
    return self.userThemes.indexOf(themeId) === -1 ? false : true;
  }

  self.addThemeToUser = function(theme){
    self.user = TokenService.decodeToken();
    var data = {
      themeId: theme._id
    }
    User.addTheme({id: self.user._id}, data, function(user){
      self.userThemes.push(theme._id);
      self.checkTheme(theme._id);
    });
  }

  self.removeThemeFromUser = function(theme){
    self.user = TokenService.decodeToken();
    var data = {
      themeId: theme._id
    }
    User.removeTheme({id: self.user._id}, data, function(user){
      var index = self.userThemes.indexOf(theme._id);
      self.userThemes.splice(index, 1);
    });
  }

  self.getThemes();
  self.getUsers();
  self.getUser();

}