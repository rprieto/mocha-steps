import { step, xstep } from "../lib/step";

describe('ignored', function() {

  describe('it()', function() {

    xit('is not executed', function() {
    });

    it('is not executed');

  });

  describe('step()', function() {

    xstep('is not executed', function() {
    });

    step('is not executed');

  });

});
