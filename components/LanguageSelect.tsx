import { Icon } from '@iconify/react'
import * as Select from '@radix-ui/react-select'
import capitalize from 'lib/capitalize'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { styled } from 'stitches.config'
import Flex from './Flex'
import IconButton from './IconButton'

const SelectContent = styled(Select.Content, {
  borderRadius: 4,
  bg: '$panel',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
})

const SelectViewport = styled(Select.Viewport, {
  py: 8,
})

const SelectItem = styled(Select.Item, {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  py: 6,
  pl: 16,
  pr: 48,
  gap: 12,
  outline: 0,
  cursor: 'pointer',
  userSelect: 'none',

  '&[data-disabled]': {
    color: '$textDirabled',
    pointerEvents: 'none',
  },

  '&[data-highlighted]': {
    bg: '$hover',
  },
})

const SelectItemIndicator = styled(Select.ItemIndicator, {
  position: 'absolute',
  top: 'calc(50% - 12px)',
  right: 16,
  fontSize: 24,
  lineHeight: 1,
  pointerEvents: 'none',
})

export default function LanguageSelect() {
  const router = useRouter()

  const { pathname, asPath, query, locale, locales } = router

  const languageNames = useMemo(
    () =>
      new Intl.DisplayNames([locale ?? 'en'], {
        type: 'language',
      }),
    [locale]
  )

  const handleValueChange = (value: string) => {
    router.push({ pathname, query }, asPath, { locale: value })
  }

  return (
    <Select.Root defaultValue={locale ?? 'en'} onValueChange={handleValueChange}>
      <Select.Trigger asChild>
        <IconButton size="large">
          <Select.Value />
        </IconButton>
      </Select.Trigger>
      <Select.Portal>
        <SelectContent>
          <SelectViewport>
            {locales?.map((lang) => (
              <SelectItem key={lang} value={lang}>
                <Select.ItemText>
                  <Flex>
                    <Image src={`/images/flags/${lang}.png`} alt={lang} width={24} height={18} />
                  </Flex>
                </Select.ItemText>
                {capitalize(languageNames.of(lang) ?? lang)}
                <SelectItemIndicator>
                  <Icon icon="mdi:check" />
                </SelectItemIndicator>
              </SelectItem>
            ))}
          </SelectViewport>
        </SelectContent>
      </Select.Portal>
    </Select.Root>
  )
}
