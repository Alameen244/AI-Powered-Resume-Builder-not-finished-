import { useLayoutEffect, useState } from 'react'

const STORAGE_KEY = 'resume-os-theme'
const DEFAULT_MODE = 'dark'

function getStoredMode() {
  try {
    const storedMode = localStorage.getItem(STORAGE_KEY)
    return storedMode === 'light' || storedMode === 'dark' ? storedMode : DEFAULT_MODE
  } catch {
    return DEFAULT_MODE
  }
}

export function useThemeMode() {
  const [mode, setMode] = useState(getStoredMode)

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = mode
    document.documentElement.style.colorScheme = mode
    try {
      localStorage.setItem(STORAGE_KEY, mode)
    } catch {
    }
  }, [mode])

  const toggleMode = () => {
    setMode((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  return { mode, toggleMode }
}
