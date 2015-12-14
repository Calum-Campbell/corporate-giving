angular
.module('cause-app')
.controller('ThemesController', ThemesController);

ThemesController.$inject = ["Theme","$http"]

function ThemesController(Theme, $http){
  var self = this;

  self.all     = [];
  self.themes   = [];
  self.theme    = {};

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

  self.getThemes = function(){
    Theme.query(function(data){
      return self.all = data;
    })
  }
  self.getThemes();
// self.getWebThemeNames();

}