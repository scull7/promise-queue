/*globals exports*/
var CacheItem  = require(__dirname + '/cache/item'),
    cache = {},

// `memory`
// ========
// A simple synchronous in memory cache
    memory  = {
      // `get`
      // -----
      // Retrieve a value from the cache
      // @param {string} key
      // @return {*}
      // @api {public}
      'get': function (key) {
        var cached = cache[key];

        if(!cached || !cached.isValid()) {
          return null;
        }
        return cached;
      },
      // `set`
      // -----
      // Set a value into the cache
      // @param {string} key
      // @param {*} value
      // @param {number} ttl
      // @return {memory}
      // @api {public}
      'set': function (key, value, ttl) {
        var now    = (new Date()).getTime();
        cache[key] = this.itemFactory(value, ttl, now);

        return this;
      },
      // `del`
      // -----
      // Delete any cached value at the given key
      // @param {string} key
      // @return {memory}
      // @api {public}
      'del': function (key) {
        delete cache[key];
        return this;
      },
      // `clear`
      // -------
      // Clear the current cache
      // @return {memory}
      // @api {public}
      'clear': function () {
        cache = {};
      },
      // `itemFactory`
      // -------------
      // A function that will create cache items.
      // By default it will return a new `CacheItem`
      // object.
      // @param {*} value
      // @param {number} ttl
      // @param {number} now
      // @return {CacheItem}
      // @api {public}
      'itemFactory': function (value, ttl, now) {
        return new CacheItem(value, ttl, now);
      }
    };
module.exports  = memory;