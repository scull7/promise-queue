/*global exports, require*/

var Promise = require('promise'),
    cache   = require(__dirname + '/lib/cache')
;
// `setCache`
// ----------
// Allow the user to override the internal caching
// mechanism.
// @param {Cache} new_cache
// @return {void}
// @api {public}
exports.setCache = function (new_cache) {
  cache = new_cache;
};

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
  var cached  = cache.get(key),
      promise = null,
      handler = function clear () { cache.del(key); }
  ;

  if (cached && cached.isValid()) {
    promise = cached.getValue();
  } else {

    if (! (task instanceof Promise) ) {
      promise = exports.task(task);
    } else {
      promise = task;
    }
    promise = promise.then(handler, handler);
    cache.set(key, promise, ttl);
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