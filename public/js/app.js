angular
  .module('corporate-giving', ['ngResource', 'angular-jwt', 'ui.router'])
  // .constant('API', 'https://cause-app.herokuapp.com/api')
  .constant('API', 'http://localhost:3000/api')
  .config(MainRouter)
  .config(function($httpProvider){
    $httpProvider.interceptors.push('authInterceptor')
  })


  MainRouter.$inject = ['$stateProvider', '$urlRouterProvider'];

  function MainRouter($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: "/",
        templateUrl: "index.html"
      })
    $urlRouterProvider.otherwise("/");
  }