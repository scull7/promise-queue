queue = require(__dirname + '/../app').queue
setCache = require(__dirname + '/../app').setCache
task    = require(__dirname + '/../app').task
memory  = require(__dirname + '/../lib/cache')
Promise = require 'promise'
sinon   = require 'sinon'

describe 'queue', ->
  beforeEach () -> return memory.clear()

  it 'should be a function', ->
    queue.should.be.type 'function'

  it 'should return a promise from a callback function', ->
    func = (cb) -> return

    queue('key', func).should.be.instanceOf Promise

  it 'should return the same promise if it is not fulfilled.', ->
    func  = (cb) -> return

    promise = queue('test', func)

    promise.should.be.instanceOf Promise

    promise2 = queue('test', func)

    promise2.should.equal promise

  it 'given a task that is a promise it should just utilize the promise', ->
    work = new Promise (reject, resolve) ->
      return resolve('test')

    spy  = sinon.spy task

    queue('test', work)

    spy.called.should.not.be.ok

describe 'setCache', ->

  it 'should be a function', ->
    setCache.should.be.type 'function'

  it 'should set the current cach object', ->
    cacheStub = sinon.stub({
      'get': () -> return null
      'set': () -> return null
    })
    setCache cacheStub

    queue('test', () -> return null)

    cacheStub.get.calledOnce.should.be.true