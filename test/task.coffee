task = require(__dirname + '/../app').task
Promise = require 'promise'

describe 'task', ->

  it 'should be a function', ->
    task.should.be.type 'function'

  it 'should return a promise object', ->
    test = () -> return null
    task(test).should.be.instanceOf Promise

  it 'should reject the promise when an error is returned', ->
    error = new Error('bad juju')
    test = (cb) -> cb(error)
    promise = task(test)

    promise.should.be.instanceOf Promise

    promise.then(null, (err) ->
      err.should.equal error
    )

  it 'should resolve the promise if an error is not returned', ->
    result  = 'test'
    test    = (cb) -> return cb null, result
    promise = task(test)

    promise.then (res) ->
      res.should.equal result