require('../lib/step');

describe('async callback', function() {

  describe('it()', function() {

    it('A', function(done) {
      setTimeout(done, 50);
    });

    it('B', function(done) {
      setTimeout(function() {
        done('failed');
      }, 50);
    });

    it('C', function(done) {
      setTimeout(done, 50);
    });

    describe('sub-suite', function() {
      it('D', function(done) {
        setTimeout(done, 50);
      });
    });

  });

  describe('step()', function() {

    step('A', function(done) {
      setTimeout(done, 50);
    });

    step('B', function(done) {
      setTimeout(function() {
        done('failed');
      }, 50);
    });

    step('C', function(done) {
      setTimeout(done, 50);
    });

    describe('sub-suite', function() {
      step('D', function(done) {
        setTimeout(done, 50);
      });
    });

  });

});
