global.step = function(msg, fn) {

  //
  // sync tests
  //

  function sync() {

    var context = this;

    try {
      fn.call(context);
    } catch (ex) {
      context.test.parent._bail = true;
      throw ex;
    }

  }

  //
  // async tests
  //

  function async(done) {

    var context = this;

    function onError() {
      context.test.parent._bail = true;
      process.removeListener('uncaughtException', onError);
    }

    process.addListener('uncaughtException', onError);

    try {
      fn.call(context, function(err) {
        if (err) {
          onError();
          done(err);
        } else {
          process.removeListener('uncaughtException', onError);
          done(null);
        }
      });
    } catch(ex) {
      onError();
      throw ex;
    }

  }

  if (fn.length === 0) {
    it(msg, sync);
  } else {
    it(msg, async);
  }

};

global.xstep = function(msg, fn) {
  it(msg, null);
};
