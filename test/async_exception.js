require('../lib/step');

describe('async exception', function() {

  describe('it()', function() {

    it('A', function(done) {
      setTimeout(done, 50);
    });

    it('B', function(done) {
      throw new Error('failed');
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
      throw new Error('failed');
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
