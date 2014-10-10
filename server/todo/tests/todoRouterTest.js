'use strict';

var request = require('supertest'),
  should = require('should'),
  app = require('../../../server'),
  Todo = require('../TodoSchema');

// End-to-end tests
describe('Todo API', function(){
  beforeEach(function(done){
    Todo.remove({}, function(err){
      done(err);
    });
  });

  describe('GET /todos', function() {
    it('should get list of todos', function(done){
      request(app)
        .get('/todos')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function(err, res){
          should(res).have.property('status', 200);
          should(res).have.property('text', '[]');
          done(err);
        });
    });
  });

  describe('POST /todos', function(){
    it('should create a todo', function(done){
      var expected = {
        name: 'todo 1',
        completed: true,
        note: 'hola this is a note'
      };

      request(app)
        .post('/todos')
        .send(expected)
        .end(function(err, res){
          should(res).have.property('status', 200);
          should(JSON.parse(res.text)).match(expected);
          done(err);
        });
    });
  });

  describe('PUT /todos/:id', function(){
    it('should get one todo', function(done){
      var expected = {
        name: 'todo 1',
        completed: true,
        note: 'hola this is a note'
      };

      Todo.create(expected, function(err, todo){
        if(err) done(err);

        expected.name = 'updated name';
        expected.completed = true;
        expected.note = 'updated note';

        request(app)
          .put('/todos/' + todo._id)
          .send(expected)
          .end(function(err, res){
            var actual = JSON.parse(res.text);
            should(res).have.property('status', 200);
            should(actual).match(expected);
            done(err);
          });
      });
    });
  });

  describe('GET /todos/:id', function(){
    it('should update one todo', function(done){
      var expected = {
        name: 'todo 1',
        completed: true,
        note: 'hola this is a note'
      };

      Todo.create(expected, function(err, todo){
        if(err) done(err);

        request(app)
          .get('/todos/' + todo._id)
          .send(expected)
          .end(function(err, res){
            var actual = JSON.parse(res.text);
            should(res).have.property('status', 200);
            should(actual).match(expected);
            done(err);
          });
      });
    });
  });

  describe('DELETE /todos/:id', function(){
    it('should delete one todo', function(done){
      var expected = {
        name: 'todo 1',
        completed: true,
        note: 'hola this is a note'
      };

      // should delete task
      Todo.create(expected, function(err, todo){
        if(err) done(err);
        request(app)
          .delete('/todos/' + todo._id)
          .end(function(err, res){
            var actual = JSON.parse(res.text);
            should(res).have.property('status', 200);
            should(actual).match(expected);
            done(err);
          });
      });

      // should have deleted it from database
      Todo.find(function(err, todos){
        var actual = JSON.parse(JSON.stringify(todos));
        should(actual).eql([]);
        done(err);
      });

    });
  });
});
