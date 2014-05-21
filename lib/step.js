
global.step = function(msg, fn) {

  function sync() {
    var context = this;
    try {
      fn.call(context);
    } catch (ex) {
      context.test.parent._bail = true;
      throw ex;
    }
  }

  function async(done) {
    var context = this;
    try {
      fn.call(context, function(err) {
        if (err) {
          context.test.parent._bail = true;
          done(err);
        } else {
          done(null);
        }
      });
    } catch (ex) {
      context.test.parent._bail = true;
      throw ex;
    }
  }

  if (fn.length === 0) {
    it(msg, sync);
  } else {
    it(msg, async);
  }

};
