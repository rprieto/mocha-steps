import { step } from "../lib/step";

describe('synchronous', function() {

  describe('it()', function() {

    it('A', function() {
    });

    it('B', function() {
      throw new Error('failed');
    });

    it('C', function() {
    });

    describe('sub-suite', function() {
        it('D', function() {
        });
    });

  });

  describe('step()', function() {

    step('A', function() {
    });

    step('B', function() {
      throw new Error('failed');
    });

    step('C', function() {
    });

    describe('sub-suite', function() {
      step('D', function() {
      });
    });

  });

});
