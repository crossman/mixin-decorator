# Mixin Decorator
![Build Status](https://travis-ci.org/crossman/mixin-decorator.svg)
![Package Version](https://badge.fury.io/js/mixin-decorator.svg)

This is a simple decorator function for mixing in behaviors from other sources.
It can be called multiple times or passed multiple behaviors. It is useful for
[React][1] components because it allows multiple definitions of the same method
for methods that return undefined. So you can have mixins that tap into the
[component life cycle][2] without breaking each other.


## Installation
```
npm install -S mixin-decorator
```

## Examples
```js
// behaviors/hello.js
export const hello = {
  hello(){
    console.log("hello world")
  }
}
```

```js
import mixin from "mixin-decorator"
import hello from "./behaviors/hello.js"

@mixin(hello)
class Hello{
}

var obj = new Hello()
obj.hello() //output: hello world
```

## Documentation
```js
@mixin(...behaviors)
```

It accepts one or more objects full of behaviors to mix in. If your mixins have
definitions of the same method and you care about the order they are called in,
use this style as they will be called in the order specified.
```js
@mixin(helloWorld, edit)
class Hello {
```

It can also be stacked. If your mixins declare the same method be aware that
they will be called in reverse order when using this style. This is because it
is equivalent to this `mixin(edit)(Hello); mixin(helloWorld)(Hello)`
```js
@mixin(helloWorld)
@mixin(edit)
class Hello {
```

  [1]: http://facebook.github.io/react/
  [2]: http://facebook.github.io/react/docs/component-specs.html#lifecycle-methods
