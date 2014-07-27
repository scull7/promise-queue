CacheItem = require __dirname + '/../lib/cache/item'

describe 'CacheItem', ->
  item = null

  beforeEach () ->
    item = new CacheItem 'test', 250

  describe '::isValid()', ->

    it 'should be a function', ->
      item.isValid.should.be.type 'function'

  describe '::getValue()', ->

    it 'should be a function', ->
      item.getValue.should.be.type 'function'

    it 'should return the set value', ->
      item.getValue().should.equal 'test'