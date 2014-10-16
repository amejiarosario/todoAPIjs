'use strict';

describe('Todo Detail Controller', function() {
  var mockData, $httpBackend, $location, scope, ctrl;

  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  beforeEach(angular.mock.module('app'));

  beforeEach(inject(function(_$httpBackend_, _$location_, $rootScope, $routeParams, $controller) {
    mockData = { _id: 1, name: 'todo1', note: 'note1' };

    $httpBackend = _$httpBackend_;
    $location = _$location_;
    $httpBackend.expectGET('/todos/1').respond(mockData);
    $routeParams.id = '1';

    scope = $rootScope.$new();
    ctrl = $controller('TodoDetailCtrl', {$scope: scope});
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should fetch phone detail', function() {
    expect(scope.todo).toEqualData({});
    $httpBackend.flush();
    expect(scope.todo).toEqualData(mockData);
  });


  describe('#update', function() {
    var updatedTodo;

    beforeEach(function(){
      $httpBackend.flush();

      updatedTodo = { _id: 1, name: 'updated todo1', note: 'updated note1' };
      scope.todo.name = updatedTodo.name;
      scope.todo.note = updatedTodo.note;

      $httpBackend.expectPUT('/todos/' + updatedTodo._id , updatedTodo)
        .respond(201, updatedTodo);

      scope.update();
      $httpBackend.flush();
    });

    it('should update todo name', function() {
      expect(scope.todo.name).toEqual(updatedTodo.name);
    });

    it('should update todo note', function() {
      expect(scope.todo.note).toEqual(updatedTodo.note);
    });

    it('should redirect to root path', function() {
      expect($location.path()).toEqual('/');
    });
  });

  describe('#remove', function() {
    beforeEach(function(){
      $httpBackend.flush();
      $httpBackend.expectDELETE('/todos/' + mockData._id)
        .respond(201, mockData);

      scope.remove();
      $httpBackend.flush();
    });

    it('should redirect to root path', function() {
      expect($location.path()).toEqual('/');
    });
  });
});
