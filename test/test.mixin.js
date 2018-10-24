
import { expect } from 'chai';

import mixin from "../src"
import assert from "assert"

const AF = Symbol('AF');

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

const whyWorld = { 
  [AF]() { 
    return "AF";
  }
}


// mixin
describe('mixin', function(){

  it('should mix a function with a symbol for a name into a class',
    () => {

    @mixin(whyWorld)
    class TestClass{}

    const instance = new TestClass();
    expect(typeof instance[AF]).to.equal('function');
    expect(instance[AF]()).to.equal('AF');
  });

  it('should mix a function with a string for a name into a class',
    () => {

    @mixin(helloWorld)
    class TestClass{}

    const instance = new TestClass();
    expect(typeof instance.hello).to.equal('function');
    expect(instance.hello()).to.equal('hello world');

  });

  // it(`should throw an error if multiple non-void functions of the same name
  //     are mixed in`,
  //   () => {
  //   @mixin(helloWorld)
  //   @mixin(hiWorld)
  //   class TestClass{}
  //
  //   var instance = new TestClass()
  //   const testHello = () => instance.hello();
  //   expect(testHello).to.throw(Error);
  // });

  it(`should allow multiple mixins to be applied if none of the method names
      are the same`,
    () => {

    // // @mixin(helloWorld)
    // @mixin(byeWorld)
    // class TestClass{}
    //
    // var instance = new TestClass();
    //
    // // expect(instance.hello()).to.equal(helloWorld.hello());
    // expect(instance.bye()).to.equal(byeWorld.bye());
    //
    // return

    @mixin(helloWorld, byeWorld)
    class TestClass2{}

    var instance2 = new TestClass2();
    expect(instance2.hello()).to.equal(helloWorld.hello());
    expect(instance2.bye()).to.equal(byeWorld.bye())


  });

  return


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
