/// <reference types="mocha" />

declare module "mocha-steps" {
  var step: (title: string, fn?: Mocha.Func | undefined) => Mocha.Test;
  var xstep: (title: string, fn?: Mocha.Func | undefined) => Mocha.Test;
}