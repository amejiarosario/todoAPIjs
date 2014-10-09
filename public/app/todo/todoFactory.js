'use strict';

angular.module('todo')
  .factory('Todos', ['$resource', function($resource){
    return $resource('/todos/:id', null, {
      'update': { method:'PUT' }
    });
  }]);
