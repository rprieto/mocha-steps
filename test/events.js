require('../lib/step');
var EventEmitter = require('events').EventEmitter;

describe('events', function() {

  describe('it()', function() {

    var e = new EventEmitter();

    it('A', function() {
      setTimeout(function() {
        e.emit('data', 'hello');
      }, 50);
    });

    it('B', function(done) {
      e.on('data', function() {
        throw new Error('oh no');
      });
    });

    it('C', function(done) {
      setTimeout(done, 200);
    });

    describe('sub-suite', function() {
        it('D', function(done) {
          setTimeout(done, 50);
        });
    });

  });

  describe('step()', function() {

    var e = new EventEmitter();

    step('A', function() {
      setTimeout(function() {
        e.emit('data', 'hello');
      }, 50);
    });

    step('B', function(done) {
      e.on('data', function() {
        throw new Error('oh no');
      });
    });

    step('C', function(done) {
      setTimeout(done, 300);
    });

    describe('sub-suite', function() {
        step('D', function(done) {
          setTimeout(done, 50);
        });
    });

  });

});
