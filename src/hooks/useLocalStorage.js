import { useEffect, useState } from 'react'

export const useLocalStorage = (key, initialValue, options = {}) => {
  const { deleteKeyIfValueIs = null } = options
  // We pass useState a function that handles initial state
  // creation. That way, the function is executed only once.
  const [value, setValue] = useState(initialValue)

  // Register global event listener on initial state creation. This
  // allows us to react to change events emitted by setValue below.
  // That way we can keep value in sync between multiple call
  // sites to useLocalStorage with the same key. Whenever the value of
  // key in localStorage is changed anywhere in the application, all
  // storedValues with that key will reflect the change.
  useEffect(() => {
    let value = localStorage[key]
    // If a value isn't already present in local storage, set it to the
    // provided initial value.
    if (value === undefined) {
      value = initialValue
      if (typeof newValue !== `string`) localStorage[key] = JSON.stringify(value)
      localStorage[key] = value
    }
    // If value came from local storage it might need parsing.
    try {
      value = JSON.parse(value)
      // eslint-disable-next-line no-empty
    } catch (error) {}
    setValue(value)

    // The CustomEvent triggered by a call to useLocalStorage somewhere
    // else in the app carries the new value as the event.detail.
    const cb = event => setValue(event.detail)
    document.addEventListener(`localStorage:${key}Change`, cb)
    return () => document.removeEventListener(`localStorage:${key}Change`, cb)
  }, [initialValue, key])

  const setStoredValue = newValue => {
    if (newValue === value) return

    // Conform to useState API by allowing newValue to be a function
    // which takes the current value.
    if (newValue instanceof Function) newValue = newValue(value)

    const event = new CustomEvent(`localStorage:${key}Change`, {
      detail: newValue,
    })
    document.dispatchEvent(event)

    setValue(newValue)

    if (newValue === deleteKeyIfValueIs) delete localStorage[key]
    if (typeof newValue === `string`) localStorage[key] = newValue
    else localStorage[key] = JSON.stringify(newValue)
  }
  return [value, setStoredValue]
}
