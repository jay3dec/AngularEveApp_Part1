angular.module('myApp', [
  'ngRoute',
  'home',
  'signin'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}]);
