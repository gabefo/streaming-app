import { Icon } from '@iconify/react'
import capitalize from 'lib/capitalize'
import { useTranslation } from 'next-i18next'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import { darkTheme } from 'stitches.config'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './DropdownMenu'
import IconButton from './IconButton'

type Theme = 'light' | 'dark' | 'system'

export default function Settings() {
  const router = useRouter()

  const { t } = useTranslation()

  const { theme, setTheme, resolvedTheme } = useTheme()

  const { pathname, asPath, query, locale, locales } = router

  const languages = useMemo(() => {
    if (!locales) {
      return []
    }

    const languages = []

    for (const code of locales) {
      languages.push({
        code,
        name: capitalize(
          new Intl.DisplayNames([code], {
            type: 'language',
          }).of(code) as string
        ),
      })
    }

    return languages
  }, [locales])

  useEffect(() => {
    const isDark = resolvedTheme === 'dark'

    document.documentElement.classList.toggle(darkTheme.className, isDark)
    document.documentElement.classList.toggle('light-theme', !isDark)
    document.documentElement.style.setProperty('color-scheme', resolvedTheme ?? 'light')
  }, [resolvedTheme])

  const handleLanguageChange = (value: string) => {
    router.push({ pathname, query }, asPath, { locale: value })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton size="large">
          <Icon icon="mdi:dots-vertical" />
        </IconButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            {t('appearance')}: {t(`theme.${theme as Theme}`)}
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
              <DropdownMenuRadioItem value="system">{t('theme.system')}</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="light">{t('theme.light')}</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="dark">{t('theme.dark')}</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            {t('language')}: {languages.find(({ code }) => code === locale)?.name}
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={locale} onValueChange={handleLanguageChange}>
              {languages.map(({ code, name }) => (
                <DropdownMenuRadioItem key={code} value={code}>
                  {name}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
