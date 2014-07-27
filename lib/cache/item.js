// `CacheItem`
// -------------
// A simple cache object.
// @param {*} value
// @param {number} ttl
// @param {number} now
function CacheItem(value, ttl, now) {
  this.value      = value;
  this.timestamp  = now || (new Date()).getTime();
  this.ttl        = ttl || -1;
}
CacheItem.prototype = {
  // `isValid`
  // ---------
  // @return {boolean}
  // @api {public}
  'isValid': function () {
    if (this.ttl < 0) {
      return true;
    }
    var now = (new Date()).getTime();
    return (now - this.timestamp) < this.ttl;
  },
  // `getValue`
  // ----------
  // Get the value stored in this cached item.
  // @return {*}
  // @api {public}
  'getValue': function () {
    return this.value;
  }
};

module.exports = CacheItem;