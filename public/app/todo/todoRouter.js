'use strict';

angular.module('todo')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/app/todo/todos.html',
        controller: 'TodoController'
      })

      .when('/:id', {
        templateUrl: '/app/todo/todoDetail.html',
        controller: 'TodoDetailCtrl'
     });
  }]);
