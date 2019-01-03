import { step } from "../lib/step";

function wait(ms: number) {
  return new Promise(function(resolve, reject) {
    setTimeout(resolve, ms);
  })
}

describe('return it()', function() {

  describe('it()', () => {

    it('should timeout', function() {
      return wait(10); 
    }).timeout(5);

    it('should succeed', function() {
      return wait(5);
    }).timeout(10);

  })

  describe('step()', () => {

    step('should timeout', function() {
      return wait(10); 
    }).timeout(5);

    step('should succeed', function() {
      return wait(5);
    }).timeout(10);

  })

})