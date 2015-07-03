export default function mixin(...behaviors){

  return function({prototype}){

    behaviors.forEach(behavior => {

      Object.keys(behavior).forEach(key => {
        const mixinKey = `__mixin_${key}`

        prototype[mixinKey] = prototype[mixinKey] || [prototype[key]]
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
