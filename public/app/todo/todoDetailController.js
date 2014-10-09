'use strict';

angular.module('todo')
  .controller('TodoDetailCtrl', ['$scope', '$routeParams', 'Todos', '$location', function ($scope, $routeParams, Todos, $location) {
    $scope.todo = Todos.get({id: $routeParams.id });

    $scope.update = function(){
      Todos.update({id: $scope.todo._id}, $scope.todo, function(){
        $location.url('/');
      });
    };

    $scope.remove = function(){
      Todos.remove({id: $scope.todo._id}, function(){
        $location.url('/');
      });
    };
  }]);
