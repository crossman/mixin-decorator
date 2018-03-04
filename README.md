## Mixin Decorator with Symbols: 
This is a modification ( fork) of the Mixin Decorator with all its initial README.md 
listed below.

This version adds the ability for mixin behaviors to have Symbols as keys instead of only strings.

This modification was made as a pull request to the original library.  Pending that request, I have published this library here.

**Meanwhile, thanks to [crossman](https://www.npmjs.com/~crossman)** for building this in the first place.

Otherwise, please refer to the original documentation below.

# Mixin Decorator
![Build Status](https://travis-ci.org/crossman/mixin-decorator.svg)
![Package Version](https://badge.fury.io/js/mixin-decorator.svg)

This is a simple decorator function for mixing in behaviors from other sources.
It can be called multiple times or passed multiple behaviors. It is useful for
[React][1] components because it allows multiple definitions of the same method
for methods that return undefined. So you can have mixins that tap into the
[component lifecycle][2] without breaking each other.


## Installation
```
npm install -S mixin-decorator
```

## Examples
```js
// behaviors/hello.js
const hello = {
  hello(){
    console.log("hello world")
  }
}

export default hello
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

### Using mixin-decorator with React Components
mixin-decorator let's multiple mixins declare the same method. This is great for letting mixin's tap into React's lifecycle.
```js
import React from "react"
import mixin from "mixin-decorator"

const behavior1 ={
  componentDidMount(){
    console.log("behavior1 tapped into componentDidMount")
  }
}

const behavior2 ={
  componentDidMount(){
    console.log("so did behavior2")
  }
}

@mixin(behavior1, behavior2)
class MyComponent extends React.Component {
  componentDidMount(){
    console.log("i'm a component")
  }

  render(){
    return <div>Hello</div>
  }
}
```

When MyComponent is mounted the console would have 3 logs:

```
i'm a component
behavior1 tapped into componentDidMount
so did behavior2
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
