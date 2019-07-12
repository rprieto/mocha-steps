module.exports.step = global.step = function(msg, fn) {
  function markRemainingTestsAndSubSuitesAsPending(currentTest) {
      if (currentTest._retries !== -1 && currentTest._currentRetry < currentTest._retries) {
        return;
      }
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

    var timeout = setTimeout(function() {
      markRemainingTestsAndSubSuitesAsPending(context.test)
    }, context.timeout())

    try {
      var promise = fn.call(context);
      if (promise != null && promise.then != null && promise.catch != null) {
        return promise.catch(function(err) {
          clearTimeout(timeout)
          markRemainingTestsAndSubSuitesAsPending(context.test);
          throw err;
        });
      } else {
        clearTimeout(timeout)
        return promise;
      }
    } catch (ex) {
      clearTimeout(timeout)
      markRemainingTestsAndSubSuitesAsPending(context.test);
      throw ex;
    }

  }

  //
  // async tests
  //

  function async(done) {

    var context = this;

    var timeout = setTimeout(function() {
      markRemainingTestsAndSubSuitesAsPending(context.test)
    }, context.timeout())

    function onError() {
      markRemainingTestsAndSubSuitesAsPending(context.test);
      process.removeListener('uncaughtException', onError);
    }

    process.addListener('uncaughtException', onError);

    try {
      fn.call(context, function(err) {
        clearTimeout(timeout)

        if (err) {
          onError();
          done(err);
        } else {
          process.removeListener('uncaughtException', onError);
          done(null);
        }
      });
    } catch(ex) {
      clearTimeout(timeout)

      onError();
      throw ex;
    }

  }

  if (fn == null) {
    return it(msg);
  } else if (fn.length === 0) {
    return it(msg, sync);
  } else {
    return it(msg, async);
  }

};

module.exports.xstep = global.xstep = function(msg, fn) {
  return it(msg, null);
};
