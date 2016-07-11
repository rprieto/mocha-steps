# mocha-steps

> Sequential scenarios for Mocha

Global `step()` function, as a drop-in replacement for `it()`. Any failing `step` will abort the parent `describe` immediately. This is handy for BDD-like scenarios, or smoke tests that need to run through specific steps.

### Setup

[![NPM](https://nodei.co/npm/mocha-steps.png?compact=true)](https://nodei.co/npm/mocha-steps/)

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
