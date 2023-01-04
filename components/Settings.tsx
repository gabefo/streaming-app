import { Icon } from '@iconify/react'
import * as Popover from '@radix-ui/react-popover'
import capitalize from 'lib/capitalize'
import { useTranslation } from 'next-i18next'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { darkTheme, styled } from 'stitches.config'
import IconButton from './IconButton'
import Text from './Text'
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from './List'

const PopoverContent = styled(Popover.Content, {
  width: 320,
  borderRadius: 4,
  bg: '$panel',
  boxShadow: '0 4px 32px rgba(0, 0, 0, 0.1)',

  '&:focus': {
    outline: 'none',
  },
})

type MenuProps = {
  children: ReactNode
  value: number
  index: number
}

function Menu({ children, value, index }: MenuProps) {
  return value === index ? <>{children}</> : null
}

const MenuHeader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  px: 4,
  gap: 12,
  borderBottom: '1px solid $border',
})

const MenuTitle = styled('div', {
  display: 'flex',
  alignItems: 'center',
  minHeight: 48,
  fontSize: '1rem',
  fontWeight: 400,
  lineHeight: '1.5rem',
})

const RightIcon = styled('div', {
  ml: 8,
  fontSize: 24,
  color: '$textSecondary',
})

type Theme = 'light' | 'dark' | 'system'

export default function Settings() {
  const router = useRouter()

  const [activeMenu, setActiveMenu] = useState(0)

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

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setActiveMenu(0)
    }
  }

  const handleLanguageChange = (value: string) => {
    router.push({ pathname, query }, asPath, { locale: value })
  }

  return (
    <Popover.Root modal onOpenChange={handleOpenChange}>
      <Popover.Trigger asChild>
        <IconButton size="large">
          <Icon icon="mdi:dots-vertical" />
        </IconButton>
      </Popover.Trigger>
      <Popover.Portal>
        <PopoverContent align="end" sideOffset={8}>
          <Menu value={activeMenu} index={0}>
            <List>
              <ListItem>
                <ListItemButton onClick={() => setActiveMenu(1)}>
                  <ListItemIcon>
                    <Icon icon="mdi:brightness-6" />
                  </ListItemIcon>
                  <ListItemText css={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
                    <Text>{t('theme')}</Text>
                    <Text color="secondary">{t(theme as Theme)}</Text>
                  </ListItemText>
                  <RightIcon>
                    <Icon icon="mdi:chevron-right" />
                  </RightIcon>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={() => setActiveMenu(2)}>
                  <ListItemIcon>
                    <Icon icon="mdi:web" />
                  </ListItemIcon>
                  <ListItemText css={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
                    <Text>{t('language')}</Text>
                    <Text color="secondary">
                      {languages.find(({ code }) => code === locale)?.name}
                    </Text>
                  </ListItemText>
                  <RightIcon>
                    <Icon icon="mdi:chevron-right" />
                  </RightIcon>
                </ListItemButton>
              </ListItem>
            </List>
          </Menu>
          <Menu value={activeMenu} index={1}>
            <MenuHeader>
              <IconButton onClick={() => setActiveMenu(0)}>
                <Icon icon="mdi:arrow-left" />
              </IconButton>
              <MenuTitle>{t('theme')}</MenuTitle>
            </MenuHeader>
            <List>
              {(['system', 'dark', 'light'] as Theme[]).map((value) => (
                <ListItem key={value}>
                  <Popover.Close asChild>
                    <ListItemButton onClick={() => setTheme(value)}>
                      {theme === value ? (
                        <ListItemIcon>
                          <Icon icon="mdi:check" />
                        </ListItemIcon>
                      ) : null}
                      <ListItemText inset={theme !== value}>{t(value)}</ListItemText>
                    </ListItemButton>
                  </Popover.Close>
                </ListItem>
              ))}
            </List>
          </Menu>
          <Menu value={activeMenu} index={2}>
            <MenuHeader>
              <IconButton onClick={() => setActiveMenu(0)}>
                <Icon icon="mdi:arrow-left" />
              </IconButton>
              <MenuTitle>{t('language')}</MenuTitle>
            </MenuHeader>
            <List>
              {languages.map(({ code, name }) => (
                <ListItem key={code}>
                  <Popover.Close asChild>
                    <ListItemButton onClick={() => handleLanguageChange(code)}>
                      {locale === code ? (
                        <ListItemIcon>
                          <Icon icon="mdi:check" />
                        </ListItemIcon>
                      ) : null}
                      <ListItemText inset={locale !== code}>{name}</ListItemText>
                    </ListItemButton>
                  </Popover.Close>
                </ListItem>
              ))}
            </List>
          </Menu>
        </PopoverContent>
      </Popover.Portal>
    </Popover.Root>
  )
}
