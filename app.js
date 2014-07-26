/*global exports, require*/

var Promise = require('promise'),
    cache   = {}
;
// `Promise Queue`
// ---------------
// This is a pipeline queue implementation that uses
// promises.
// @param {string} key
// @param {Promise} task
// @param {number} ttl
// @return {Promise}
// @api {public}
exports.queue = function (key, task, ttl) {
  var cached  = cache[key],
      now     = (new Date()).getTime(),
      promise = null
  ;

  if (cached && (now - cached.timestamp) >= cached.ttl ) {
    promise = cached.promise;
  } else {

    if (!(task instanceof Promise)) {
      promise = exports.task(task);
    } else {
      promise = task;
    }

    cache[key] = {
      'promise': promise,
      'ttl': ttl || -1,
      'timestamp': now
    };
  }
  return promise;
};

// `task`
// ------
// This function takes a standard node callback based
// function and turns it into a Promise based task.
// @param {function(callback)} work
// @return {Promise}
// @api {public}
exports.task = function (work) {
  var promise = new Promise(function (resolve, reject) {
    work(function (err, res) {
      if (err) return reject(err)
      // @TODO: Enable multiple arguments.
      return resolve(res);
    });
  });
  return promise;
};