import { Icon } from '@iconify/react'
import { DismissableLayer } from '@radix-ui/react-dismissable-layer'
import useAutocomplete from 'hooks/useAutocomplete'
import { useTranslation } from 'next-i18next'
import { useRef, useState } from 'react'
import { styled } from 'stitches.config'
import SearchResults from './SearchResults'
import TextField from './TextField'

const Root = styled('div', {
  position: 'relative',
  ml: 48,
  width: 540,
})

export default function SearchDesktop() {
  const { t } = useTranslation('common')

  const [open, setOpen] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  const { query, results } = useAutocomplete(inputRef)

  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <DismissableLayer asChild onInteractOutside={handleClose}>
      <Root>
        <TextField
          ref={inputRef}
          fullWidth
          variant="filled"
          type="search"
          autoComplete="off"
          placeholder={t('search.placeholder')}
          startAdornment={<Icon icon="mdi:search" />}
          onClick={handleClick}
        />
        {open && (
          <SearchResults
            query={query}
            results={results}
            onItemClick={handleClose}
            css={{
              position: 'absolute',
              left: 0,
              right: 0,
              mt: 8,
              maxHeight: 350,
              borderRadius: 4,
              bg: '$panel',
              boxShadow: '0 4px 32px rgba(0, 0, 0, 0.1)',
            }}
          />
        )}
      </Root>
    </DismissableLayer>
  )
}
