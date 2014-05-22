var EventEmitter = require('events').EventEmitter;

require('../lib/step');

describe('step()', function() {

  describe('synchronous', function() {

    step('step 1', function() {
    });

    step('step 2', function() {
      throw new Error('failed');
    });

    step('step 3', function() {
    });

  });

  describe('async (callback)', function() {

    step('step 1', function(done) {
      setTimeout(done, 50);
    });

    step('step 2', function(done) {
      setTimeout(function() {
        done('failed');
      }, 50);
    });

    step('step 3', function(done) {
      setTimeout(done, 50);
    });

  });

  describe('async (exception)', function() {

    step('step 1', function(done) {
      setTimeout(done, 50);
    });

    step('step 2', function(done) {
      throw new Error('failed');
    });

    step('step 3', function(done) {
      setTimeout(done, 50);
    });

  });

  describe('async (exception in callback)', function() {

    step('step 1', function(done) {
      setTimeout(done, 50);
    });

    step('step 2', function(done) {
      setTimeout(function() {
        throw new Error('failed');
      }, 50);
    });

    step('step 3', function(done) {
      setTimeout(done, 50);
    });

  });

  describe('async (events)', function() {

    var e = new EventEmitter();

    step('step 1', function() {
      setTimeout(function() {
        e.emit('data', 'hello');
      }, 50);
    });

    step('step 2', function(done) {
      e.on('data', function() {
        throw new Error('oh no');
      });
    });

    step('step 3', function(done) {
      setTimeout(done, 300);
    });

  });

  describe('ignored', function() {

    xstep('is not executed', function() {
    });

  });

});
