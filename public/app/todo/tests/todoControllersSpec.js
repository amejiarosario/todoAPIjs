'use strict';
// https://docs.angularjs.org/api/ngMock/service/$httpBackend

describe('Todo Controller', function() {
  var mockScope = {},
      controller,
      $httpBackend,
      mockData;

  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  beforeEach(angular.mock.module('app'));

  describe('CRUD', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_, $controller, $rootScope){
      mockData = [
        { _id: 1, name: 'todo1', note: 'note1' },
        { _id: 2, name: 'todo2', note: 'note2' }
      ];

      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('/todos').respond(mockData);

      mockScope = $rootScope.$new();
      controller = $controller('TodoController', {
        $scope: mockScope
      });
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    describe('#query', function() {
      it('should initialize todos', function() {
        expect(mockScope.todos).toEqualData([]);
        $httpBackend.flush();
        expect(mockScope.todos).toEqualData(mockData);
      });

      describe('editing funtionality', function(){
        beforeEach(function(){ $httpBackend.flush(); });

        it('should initialize editing', function() {
          expect(mockScope.editing).toEqual([]);
        });

        it('#edit', function() {
          mockScope.edit(1);
          expect(mockScope.editing[1]).toEqualData(mockScope.todos[1]);
        });

        it('#cancel', function() {
          mockScope.cancel(1);
          expect(mockScope.editing[1]).toEqual(false);
        });
      });
    });

    describe('#save', function() {
      beforeEach(function(){
        mockData = { name: 'new todo', completed: false };
      });

      it('should increment $scope.todos', function() {
        $httpBackend.expectPOST('/todos', mockData)
          .respond(201, mockData);

        mockScope.newTodo = mockData.name;
        mockScope.save();
        $httpBackend.flush();
        expect(mockScope.todos.length).toEqual(3);
      });

      it('should NOT increment if new task is blank', function() {
        mockScope.save();
        $httpBackend.flush();
        expect(mockScope.todos.length).toEqual(2);
      });
    });

    describe('#update', function() {
      beforeEach(function(){
        $httpBackend.flush();
        mockData = { name: 'new todo' };
        var todo = mockScope.todos[1];
        todo.name = mockData.name;

        $httpBackend.expectPUT('/todos/' + todo._id , todo)
          .respond(201, todo);

        mockScope.newTodo = mockData.name;
        mockScope.update(1);
      });

      it('should sent PUT request', function() {
        $httpBackend.flush();
      });

      it('should NOT increase todo number', function() {
        $httpBackend.flush();
        expect(mockScope.todos.length).toEqual(2);
      });
    });

    describe('#delete', function() {
      beforeEach(function(){
        $httpBackend.flush();
        var todo = mockScope.todos[1];

        $httpBackend.expectDELETE('/todos/' + todo._id)
          .respond(201, todo);

        mockScope.remove(1);
      });

      it('should sent DELETE request', function() {
        $httpBackend.flush();
      });

      it('should decrease todo number', function() {
        $httpBackend.flush();
        expect(mockScope.todos.length).toEqual(1);
      });
    });
  });
});


