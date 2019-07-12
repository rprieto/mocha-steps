require('../lib/step');

function sync() {
  if (this.runnable().body !== sync.toString())
    throw new Error('body incorrect');
}

function async(done) {
  if (this.runnable().body !== async.toString())
    throw new Error('body incorrect');
  done();
}

describe('body', function() {

  describe('it()', () => {

    it('synchronous', sync);

    it('async', async);

  });

  describe('step()', () => {

    step('synchronous', sync);

    step('async', async);

  });

});