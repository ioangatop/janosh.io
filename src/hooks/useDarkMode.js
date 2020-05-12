import { useLocalStorage } from 'hooks'
import { useEffect } from 'react'
import {
  COLOR_MODE_KEY,
  INITIAL_COLOR_MODE_CSS_PROP,
  MODE_COLORS,
} from 'utils/constants'

export const useDarkMode = () => {
  const [colorMode, setLSColorMode] = useLocalStorage(COLOR_MODE_KEY)

  // Place useDarkMode initialization in useEffect to exclude it from SSR.
  // The code inside will run on the client after React rehydration.
  // Because colors matter a lot for the initial page view, we're not
  // setting them here but in gatsby-ssr. That way it happens before
  // the React component tree mounts.
  useEffect(() => {
    const initialColorMode = document.body.style.getPropertyValue(
      INITIAL_COLOR_MODE_CSS_PROP
    )
    setLSColorMode(initialColorMode)
    // https://stackoverflow.com/a/61735300
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function setColorMode(newValue) {
    // localStorage.setItem(COLOR_MODE_KEY, newValue)
    setLSColorMode(newValue)

    if (newValue === `osPref`) {
      const mql = window.matchMedia(`(prefers-color-scheme: dark)`)
      const prefersDarkFromMQ = mql.matches
      newValue = prefersDarkFromMQ ? `dark` : `light`
    }

    for (const [name, colorByMode] of Object.entries(MODE_COLORS))
      document.body.style.setProperty(`--color-${name}`, colorByMode[newValue])
  }

  return [colorMode, setColorMode]
}
