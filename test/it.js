
describe('it()', function() {

  describe('synchronous', function() {

    it('step 1', function() {
    });

    it('step 2', function() {
      throw new Error('failed');
    });

    it('step 3', function() {
    });

    it('step 4', function() {
    });

  });

  describe('async (callback)', function() {

    it('step 1', function(done) {
      setTimeout(done, 50);
    });

    it('step 2', function(done) {
      setTimeout(function() {
        done('failed');
      }, 50);
    });

    it('step 3', function(done) {
      setTimeout(done, 50);
    });

    it('step 4', function(done) {
      setTimeout(done, 50);
    });

  });

  describe('async (exception)', function() {

    it('step 1', function(done) {
      setTimeout(done, 50);
    });

    it('step 2', function(done) {
      throw new Error('failed');
    });

    it('step 3', function(done) {
      setTimeout(done, 50);
    });

    it('step 4', function(done) {
      setTimeout(done, 50);
    });

  });

  describe('async (exception in callback)', function() {

    it('step 1', function(done) {
      setTimeout(done, 50);
    });

    it('step 2', function(done) {
      setTimeout(function() {
        throw new Error('failed');
      }, 50);
    });

    it('step 3', function(done) {
      setTimeout(done, 50);
    });

    it('step 4', function(done) {
      setTimeout(done, 50);
    });

  });

});
