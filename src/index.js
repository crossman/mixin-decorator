

const mergeBehaviors = (behaviors) => behaviors.reduce(
                          (curr, prev) => 
                            (typeof curr === 'function')
                              ? ({[curr.name]: curr, ...prev})
                              : ({...curr, ...prev}),
                          {}
                        );

export default function mixin(...behaviors){
  const props = mergeBehaviors(behaviors);

  return function({prototype}){
    behaviors.forEach(behavior => {
      const keySet = Object.keys(behavior).concat(Object.getOwnPropertySymbols(behavior));
      keySet.forEach(key => { 


        const keyType = typeof key; 
        if ( (keyType !== 'symbol' && keyType !== 'string') || key === 'undefined' ) { 
          throw new Error('Mixin key is undefined');
        }

        const mixinKey = keyType === 'symbol' ? Symbol(String(key)) : `__mixin_${key}`;

        prototype[mixinKey] = prototype[mixinKey] || [prototype[key]];

        prototype[mixinKey] = prototype[mixinKey]
          .concat(behavior[key])
          .filter(fn => typeof fn == "function")

        prototype[key] = function(){
          if (prototype[mixinKey].length == 1)
            return prototype[mixinKey][0].apply(this, arguments)

          for (let fn of prototype[mixinKey])
            if (fn.apply(this, arguments) !== undefined)
              throw new Error("A mixed in method returned a value when undefined was expected.")
        }
      })
    })

  }
}
