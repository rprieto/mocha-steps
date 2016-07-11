# mocha-steps

> Sequential scenarios for Mocha

[![NPM](http://img.shields.io/npm/v/mocha-steps.svg?style=flat-square)](https://npmjs.org/package/mocha-steps)
[![License](http://img.shields.io/npm/l/mocha-steps.svg?style=flat-square)](https://github.com/TabDigital/mocha-steps)

[![Build Status](http://img.shields.io/travis/rprieto/mocha-steps.svg?style=flat-square)](http://travis-ci.org/rprieto/mocha-steps)

[![Dependencies](http://img.shields.io/david/rprieto/mocha-steps.svg?style=flat-square)](https://david-dm.org/rprieto/mocha-steps)
[![Dev dependencies](http://img.shields.io/david/dev/rprieto/mocha-steps.svg?style=flat-square)](https://david-dm.org/rprieto/mocha-steps)


Global `step()` function, as a drop-in replacement for `it()`. Any failing `step` will abort the parent `describe` immediately. This is handy for BDD-like scenarios, or smoke tests that need to run through specific steps.

### Setup

```bash
npm install mocha-steps --save-dev
```

Then simply run mocha with `--require mocha-steps`.

### Example

```js
describe('my smoke test', function() {

  step('login', function() {
  });

  step('buy an item', function() {
    throw new Error('failed');
  });

  step('check my balance', function() {
  });

  xstep('temporarily ignored', function() {
  });

});
```

- With the standard it()

```
my smoke test
   ✓ login
   ✗ buy an item
   ✓ check my balance
   - temporarily ignored
```

- Using step()

```
my smoke test
   ✓ login
   ✗ buy an item
   - check my balance
   - temporarily ignored
```

### Notes

- Unlike Mocha's `--bail` option, the rest of the test suite will run normally.
- `step()` works with synchronous, async, event-based and promise tests.

When submitting a PR, please run `./test.sh` and implement new test cases if required.
