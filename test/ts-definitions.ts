import { step, xstep } from "../lib/step";

describe('ts-definitions', () => {

  step('step', function() {
    // Should succeed
  });

  xstep('xstep', () => {
    throw new Error("Should be ignored")
  });

});
