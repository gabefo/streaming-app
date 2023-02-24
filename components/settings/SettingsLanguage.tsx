import { useMemo } from 'react'

import { Icon } from '@iconify/react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import capitalize from '@utils/capitalize'

import { Dialog, DialogContent, DialogTrigger } from '@components/Dialog'
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@components/List'

import SettingsRadioGroup from './SettingsRadioGroup'

export default function SettingsLanguage() {
  const { t } = useTranslation()

  const router = useRouter()

  const { pathname, asPath, query, locale, locales } = router

  const options = useMemo(() => {
    if (!locales) {
      return []
    }

    const options = []

    for (const code of locales) {
      options.push({
        value: code,
        label: capitalize(
          new Intl.DisplayNames([code], {
            type: 'language',
          }).of(code) as string
        ),
      })
    }

    return options
  }, [locales])

  const setLocale = (locale: string) => {
    router.replace({ pathname, query }, asPath, { locale, scroll: false })
  }

  return (
    <ListItem>
      <Dialog>
        <DialogTrigger asChild>
          <ListItemButton>
            <ListItemIcon>
              <Icon icon="mdi:translate" />
            </ListItemIcon>
            <ListItemText
              primary={t('language')}
              secondary={options.find(({ value }) => value === locale)?.label}
            />
          </ListItemButton>
        </DialogTrigger>
        <DialogContent width="xs">
          <SettingsRadioGroup
            title={t('language')}
            initialValue={locale ?? 'en'}
            options={options}
            onChange={setLocale}
          />
        </DialogContent>
      </Dialog>
    </ListItem>
  )
}
