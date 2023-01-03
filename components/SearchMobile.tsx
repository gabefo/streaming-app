import { Icon } from '@iconify/react'
import useAutocomplete from 'hooks/useAutocomplete'
import { useTranslation } from 'next-i18next'
import { useRef, useState } from 'react'
import { RemoveScroll } from 'react-remove-scroll'
import { styled } from 'stitches.config'
import IconButton from './IconButton'
import SearchResults from './SearchResults'
import Tooltip from './Tooltip'

const StyledDialog = styled('div', {
  position: 'absolute',
  top: 0,
  left: 0,
  display: 'flex',
  flexDirection: 'column',
  width: '100vw',
  height: '100vh',
  bg: '$background',
  zIndex: 2,
})

const InputContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
  height: '$header',
  px: 16,
  borderBottom: '1px solid $border',
})

const InputAdornment = styled('div', {
  mr: 16,
  width: 24,
  height: 24,
  fontSize: 24,
  color: '$textSecondary',
})

const Input = styled('input', {
  flexGrow: 1,
  height: '100%',
  m: 0,
  p: 0,
  border: 0,
  outline: 'none',
  bg: 'transparent',
  color: '$text',
  fontFamily: '$openSans',
  fontSize: '1rem',
  lineHeight: '1.5rem',

  '&::placeholder': {
    color: '$textDisabled',
  },

  /* clears the 'X' from Internet Explorer */
  '&::-ms-clear, &::-ms-reveal': {
    display: 'none',
    width: 0,
    height: 0,
  },

  /* clears the 'X' from Chrome */
  '&::-webkit-search-decoration, &::-webkit-search-cancel-button, &::-webkit-search-results-button, &::-webkit-search-results-decoration':
    {
      display: 'none',
    },
})

type DialogProps = {
  onClose: () => void
}

function Dialog({ onClose }: DialogProps) {
  const { t } = useTranslation('common')

  const inputRef = useRef<HTMLInputElement>(null)

  const { query, results } = useAutocomplete(inputRef)

  return (
    <RemoveScroll allowPinchZoom forwardProps>
      <StyledDialog>
        <InputContainer>
          <InputAdornment>
            <Icon icon="mdi:search" />
          </InputAdornment>
          <Input
            ref={inputRef}
            type="search"
            autoFocus
            autoComplete="off"
            placeholder={t('search.placeholder')}
          />
          <IconButton edge="end" onClick={onClose} css={{ ml: 8 }}>
            <Icon icon="mdi:close" />
          </IconButton>
        </InputContainer>
        <SearchResults query={query} results={results} onItemClick={onClose} />
      </StyledDialog>
    </RemoveScroll>
  )
}

export default function SearchMobile() {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Tooltip content="Search">
        <IconButton size="large" onClick={handleClick}>
          <Icon icon="mdi:search" />
        </IconButton>
      </Tooltip>
      {open && <Dialog onClose={handleClose} />}
    </>
  )
}
