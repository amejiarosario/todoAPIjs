'use strict';

describe('Todo Controller', function() {

  var mockScope = {},
      controller,
      $httpBackend,
      mockData = [
        { _id: 1, name: 'todo1', note: 'note1' },
        { _id: 2, name: 'todo2', note: 'note2' }
      ];

  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  beforeEach(angular.mock.module('app'));

  beforeEach(angular.mock.inject(function(_$httpBackend_, $controller, $rootScope){
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/todos').respond(mockData);

    mockScope = $rootScope.$new();
    controller = $controller('TodoController', {
      $scope: mockScope
    });
  }));

  it('should initialize editing', function() {
    expect(mockScope.editing).toEqual([]);
  });

  it('should initialize todos', function() {
    expect(mockScope.todos).toEqualData([]);
    $httpBackend.flush();
    expect(mockScope.todos).toEqualData(mockData);

  });
});
