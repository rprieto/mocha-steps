require('../lib/step');

describe('timeouts should fail subsequent steps', function() {
  describe('it()', function() {
    this.timeout(100)

    it('A', function(done) {
      setTimeout(done, 150);
    });

    it('B', function(done) {
      setTimeout(done, 50);
    });

    describe('sub-suite', function() {
      it('C', function(done) {
        setTimeout(done, 50);
      });
    });
  });

  describe('step()', function() {
    this.timeout(100)

    step('A', function(done) {
      setTimeout(done, 150);
    });

    step('B', function(done) {
      setTimeout(done, 50);
    });

    describe('sub-suite', function() {
      step('C', function(done) {
        setTimeout(done, 50);
      });
    });
  });
});
