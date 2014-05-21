require('../lib/step');

describe('Step', function() {

  describe('synchronous', function() {

    step('step 1', function() {
    });

    step('step 2', function() {
      throw new Error('failed');
    });

    step('step 3', function() {
    });

    step('step 4', function() {
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

    step('step 4', function(done) {
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

    step('step 4', function(done) {
      setTimeout(done, 50);
    });

  });


});
