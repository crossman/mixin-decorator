import mixin from "../src"
import assert from "assert"

const helloWorld = {
  hello(){
    return "hello world"
  }
}

const hiWorld = {
  hello(){
    return "hi world"
  }
}

const byeWorld = {
  bye(){
    return "bye world"
  }
}

const callbackWorld = {
  callback(fn){
    fn()
  }
}

const callback2World = {
  callback(fn){
    fn()
  }
}


// mixin
describe('mixin', function(){



  // it should mix a behavior into a class
  it('should mix a behavior into a class', function(){


    @mixin(helloWorld)
    class TestClass{}

    var instance = new TestClass()
    assert.equal(typeof instance.hello, "function")

  }) // END it should mix a behavior into a class



  // it should allow data to be returned if there is only one method
  it('should allow data to be returned if there is only one method', function(){


    @mixin(helloWorld)
    class TestClass{}

    var instance = new TestClass()
    assert.equal(instance.hello(), helloWorld.hello())


  }) // END it should allow data to be returned if there is only one method



  // it should throw a warning if multiple non-void functions are mixed in
  it('should throw an error if multiple non-void functions are mixed in', function(){


    @mixin(helloWorld)
    @mixin(hiWorld)
    class TestClass{}

    var instance = new TestClass()
    assert.throws(() => instance.hello())


  }) // END it should throw a warning if multiple non-void functions are mixed in



  // it should allow multiple mixins to be applied
  it('should allow multiple mixins to be applied', function(){


    @mixin(helloWorld)
    @mixin(byeWorld)
    class TestClass{}

    var instance = new TestClass()
    assert.equal(instance.hello(), helloWorld.hello())
    assert.equal(instance.bye(), byeWorld.bye())

    @mixin(helloWorld, byeWorld)
    class TestClass2{}

    var instance2 = new TestClass2()
    assert.equal(instance2.hello(), helloWorld.hello())
    assert.equal(instance2.bye(), byeWorld.bye())


  }) // END it should allow multiple mixins to be applied


  // it should allow multiple void methods of the same name to be mixed in
  it('should allow multiple void methods of the same name to be mixed in', function(){

    @mixin(callbackWorld, callback2World)
    class TestClass{}

    var instance = new TestClass(),
        x        = 0

    instance.callback(function(){
      x++
    })
    assert.equal(x, 2)


  }) // END it should allow multiple void methods of the same name to be mixed in



  // it should forward arguments to mixed in methods
  it('should forward arguments to mixed in methods', function(){


    @mixin(callbackWorld)
    class TestClass{}

    var instance = new TestClass(),
        x        = 0

    instance.callback(function(){
      x++
    })
    assert.equal(x, 1)

    @mixin(callbackWorld, callback2World)
    class TestClass2{}

    var instance = new TestClass2()

    instance.callback(function(){
      x++
    })
    assert.equal(x, 3)


  }) // END it should forward arguments to mixed in methods


}) // END describe mixin
