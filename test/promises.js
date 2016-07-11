require('../lib/step');

describe('promises', function() {

  describe('it()', function() {

    it('A', function() {
      return new Promise(function(resolve, reject) {
        setTimeout(resolve, 50);
      });
    });

    it('B', function() {
      return new Promise(function(resolve, reject) {
        setTimeout(reject, 50);
      });
    });

    it('C', function() {
      return new Promise(function(resolve, reject) {
        setTimeout(resolve, 50);
      });
    });

    describe('sub-suite', function() {
      it('D', function() {
        return new Promise(function(resolve, reject) {
          setTimeout(resolve, 50);
        });
      });
    });

  });

  describe('step()', function() {

    step('A', function() {
      return new Promise(function(resolve, reject) {
        setTimeout(resolve, 50);
      });
    });

    step('B', function() {
      return new Promise(function(resolve, reject) {
        setTimeout(reject, 50);
      });
    });

    step('C', function() {
      return new Promise(function(resolve, reject) {
        setTimeout(resolve, 50);
      });
    });

    describe('sub-suite', function() {
      step('D', function() {
        return new Promise(function(resolve, reject) {
          setTimeout(resolve, 50);
        });
      });
    });

  });

});
