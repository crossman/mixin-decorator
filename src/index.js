

const mergeBehaviors = (behaviors) => behaviors.reduce(
                          (curr, prev) => 
                            (typeof curr === 'function')
                              ? ({[curr.name]: curr, ...prev})
                              : ({...curr, ...prev}),
                          {}
                        );

export default function mixin(...behaviors){

  console.log(behaviors);

  const props = Object.assign({}, ...behaviors);
  
  return function({__proto__}){

    console.log(Object.keys(__proto__));

    behaviors.forEach(behavior => {
      const keySet = Object.keys(behavior).concat(Object.getOwnPropertySymbols(behavior));
      keySet.forEach(key => { 

        const keyType = typeof key; 
        if ( (keyType !== 'symbol' && keyType !== 'string') || key === 'undefined' ) { 
          throw new Error('Mixin key is undefined');
        }

        const mixinKey = keyType === 'symbol' ? Symbol(String(key)) : `__mixin_${key}`;

        __proto__[mixinKey] = __proto__[mixinKey] || [__proto__[key]];

        __proto__[mixinKey] = __proto__[mixinKey]
          .concat(behavior[key])
          .filter(fn => typeof fn == "function")

        __proto__[key] = function(){
          if (__proto__[mixinKey].length == 1)
            return __proto__[mixinKey][0].apply(this, arguments)

          for (let fn of __proto__[mixinKey]) {
            if (fn.apply(this, arguments) !== undefined)
              throw new Error("A mixed in method returned a value when undefined was expected.");
          }
        }
      })
    })

  }
}
