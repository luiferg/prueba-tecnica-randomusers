'use client'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <button
      className={`absolute top-8 right-4 p-2 rounded-md lg:hover:scale-110 lg:active:scale-100 duration-200 bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100`}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'light' ? <Sun /> : <Moon />}
    </button>
  )
}
