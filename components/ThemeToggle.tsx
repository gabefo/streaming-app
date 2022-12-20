import { Icon } from '@iconify/react'
import { useTheme } from 'next-themes'
import { darkTheme } from 'stitches.config'
import IconButton from './IconButton'
import Tooltip from './Tooltip'

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  const isDark = resolvedTheme === 'dark'

  const handleClick = () => {
    const newTheme = isDark ? 'light' : 'dark'

    document.documentElement.classList.toggle(darkTheme.className, !isDark)
    document.documentElement.classList.toggle('light-theme', isDark)
    document.documentElement.style.setProperty('color-scheme', newTheme)

    setTheme(newTheme)
  }

  return (
    <Tooltip content={isDark ? 'Light mode' : 'Dark mode'}>
      <IconButton size="large" onClick={handleClick}>
        <Icon icon={isDark ? 'mdi:brightness-7' : 'mdi:brightness-4'} />
      </IconButton>
    </Tooltip>
  )
}
