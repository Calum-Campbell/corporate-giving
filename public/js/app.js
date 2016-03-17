angular
  .module('corporate-giving', ['ngResource', 'angular-jwt', 'ui.router','rzModule'])
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
        templateUrl: "home.html"
      })
      .state('login', {
        url: "/login",
        templateUrl: "login.html"
      })
      .state('dashboard', {
        url: "/dashboard",
        templateUrl: "dashboard.html"
      })
    $urlRouterProvider.otherwise("/");
  }