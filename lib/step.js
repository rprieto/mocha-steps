module.exports.step = global.step = function(msg, fn) {

  function markRemainingTestsAndSubSuitesAsPending(currentTest) {
      var tests = currentTest.parent.tests;
      var suites = currentTest.parent.suites;

      for (var index = tests.indexOf(currentTest) + 1; index < tests.length; index++) {
          var test = tests[index];
          test.pending = true;
      }

      for (var index = 0; index < suites.length; index++) {
          var suite = suites[index];
          suite.pending = true;
      }
  }

  //
  // sync tests
  //

  function sync() {

    var context = this;

    try {
      var promise = fn.call(context);
      if (promise != null && promise.then != null && promise.catch != null) {
        return promise.catch(function(err) {
          markRemainingTestsAndSubSuitesAsPending(context.test);
          throw err;
        });
      } else {
        return promise;
      }
    } catch (ex) {
      markRemainingTestsAndSubSuitesAsPending(context.test);
      throw ex;
    }

  }

  //
  // async tests
  //

  function async(done) {

    var context = this;

    function onError() {
      markRemainingTestsAndSubSuitesAsPending(context.test);
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

  if (fn == null) {
    it(msg);
  } else if (fn.length === 0) {
    it(msg, sync);
  } else {
    it(msg, async);
  }

};

module.exports.xstep = global.xstep = function(msg, fn) {
  it(msg, null);
};
