import { Icon } from '@iconify/react'
import { useTranslation } from 'next-i18next'
import { useTheme } from 'next-themes'
import { useEffect } from 'react'
import { darkTheme } from 'stitches.config'
import { Select, SelectItem } from './Select'

export default function ThemeSelect() {
  const { t } = useTranslation()

  const { theme, setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    const isDark = resolvedTheme === 'dark'

    document.documentElement.classList.toggle(darkTheme.className, isDark)
    document.documentElement.classList.toggle('light-theme', !isDark)
    document.documentElement.style.setProperty('color-scheme', resolvedTheme ?? 'light')
  }, [resolvedTheme])

  return (
    <Select defaultValue={theme} onValueChange={setTheme}>
      <SelectItem value="system">{t('system')}</SelectItem>
      <SelectItem value="dark">{t('dark')}</SelectItem>
      <SelectItem value="light">{t('light')}</SelectItem>
    </Select>
  )
}
