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
  DropdownMenuItemIcon,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './DropdownMenu'
import Flex from './Flex'
import IconButton from './IconButton'
import Text from './Text'

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
      <DropdownMenuContent align="end" css={{ width: 320 }}>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Flex css={{ gap: 16 }}>
              <DropdownMenuItemIcon>
                <Icon icon="mdi:brightness-6" />
              </DropdownMenuItemIcon>
              <Text>{t('theme')}</Text>
              <Text color="secondary" css={{ ml: 'auto' }}>
                {t(theme as Theme)}
              </Text>
            </Flex>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
              <DropdownMenuRadioItem value="system">{t('system')}</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="light">{t('light')}</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="dark">{t('dark')}</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Flex css={{ gap: 16 }}>
              <DropdownMenuItemIcon>
                <Icon icon="mdi:web" />
              </DropdownMenuItemIcon>
              <Text>{t('language')}</Text>
              <Text color="secondary" css={{ ml: 'auto' }}>
                {languages.find(({ code }) => code === locale)?.name}
              </Text>
            </Flex>
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
