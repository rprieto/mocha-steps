/// <reference types="mocha" />

export var step: (title: string, fn?: Mocha.Func | undefined) => Mocha.Test;
export var xstep: (title: string, fn?: Mocha.Func | undefined) => Mocha.Test;