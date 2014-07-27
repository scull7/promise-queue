memory = require __dirname + '/../lib/cache'
should  = require 'should'

describe 'in memory cache', ->
  beforeEach () -> return memory.clear()

  describe '::get()', ->
    it 'should be a function', ->
      memory.get.should.be.type 'function'

    it 'should return null if the cached item does not exist', ->
      should(memory.get('test')).not.be.ok

    it 'should retrieve set cache value', ->
      memory.set 'test', 'value'
      memory.get('test').getValue().should.equal 'value'

  describe '::set()', ->

    it 'should be a function', ->
      memory.get.should.be.type 'function'

    it 'should set a value into the cache at the given key', ->
      memory.set 'test', 'value', 250
      item = memory.get 'test'

      item.getValue().should.equal 'value'

  describe '::del()', ->

    it 'should be a function', ->
      memory.del.should.be.type 'function'

    it 'should clear the given key', ->
      memory.set 'deleteme', 'something', 250
      memory.set 'dontdelete', 'else', 250
      item = memory.get 'deleteme'
      item.getValue().should.equal 'something'

      memory.del 'deleteme'

      should(memory.get 'deleteme').not.be.ok

      memory.get('dontdelete').getValue().should.equal 'else'

  describe '::itemFactory', ->

    it 'should be a function', ->
      memory.get.should.be.type 'function'
