import { useEffect } from 'react'

import { Icon } from '@iconify/react'
import { useTranslation } from 'next-i18next'
import { useTheme } from 'next-themes'

import { Dialog, DialogContent, DialogTrigger } from '@components/Dialog'
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@components/List'

import { darkTheme } from 'stitches.config'

import SettingsRadioGroup from './SettingsRadioGroup'

export default function SettingsTheme() {
  const { t } = useTranslation()

  const { theme, setTheme, resolvedTheme } = useTheme()

  const options = [
    {
      value: 'light',
      label: t('light'),
    },
    {
      value: 'dark',
      label: t('dark'),
    },
    {
      value: 'system',
      label: t('system'),
    },
  ]

  useEffect(() => {
    const isDark = resolvedTheme === 'dark'

    document.documentElement.classList.toggle(darkTheme.className, isDark)
    document.documentElement.classList.toggle('light-theme', !isDark)
    document.documentElement.style.setProperty('color-scheme', resolvedTheme ?? 'light')
  }, [resolvedTheme])

  return (
    <ListItem>
      <Dialog>
        <DialogTrigger asChild>
          <ListItemButton>
            <ListItemIcon>
              <Icon icon="mdi:brightness-6" />
            </ListItemIcon>
            <ListItemText
              primary={t('theme')}
              secondary={options.find(({ value }) => value === theme)?.label}
            />
          </ListItemButton>
        </DialogTrigger>
        <DialogContent width="xs">
          <SettingsRadioGroup
            title={t('theme')}
            initialValue={theme ?? 'system'}
            options={options}
            onChange={setTheme}
          />
        </DialogContent>
      </Dialog>
    </ListItem>
  )
}
