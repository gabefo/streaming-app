import { forwardRef } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'
import { styled } from 'stitches.config'
import type { CSS, VariantProps } from 'stitches.config'

const InputContainer = styled('label', {
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  height: 44,
  px: 12,
  color: '$text',
  fontFamily: '$openSans',
  fontSize: '1rem',
  lineHeight: '1.5rem',
  cursor: 'text',

  variants: {
    variant: {
      standard: {
        borderBottom: '1px solid $border',
      },
      filled: {
        borderRadius: 4,
        bg: '$input',
      },
    },
    fullWidth: {
      true: {
        width: '100%',
      },
    },
  },

  defaultVariants: {
    variant: 'standard',
  },
})

const InputAdornment = styled('div', {
  width: 24,
  height: 24,
  fontSize: 24,
  color: '$textDisabled',

  variants: {
    position: {
      start: {
        mr: 8,
      },
      end: {
        ml: 8,
      },
    },
  },
})

const Input = styled('input', {
  flexGrow: 1,
  height: '100%',
  m: 0,
  p: 0,
  border: 0,
  outline: 'none',
  bg: 'transparent',
  color: 'inherit',
  font: 'inherit',

  '&::placeholder': {
    color: '$textDisabled',
  },

  '&[type="search"]': {
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
  },
})

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof InputContainer> & {
    css?: CSS
    startAdornment?: ReactNode
    endAdornment?: ReactNode
  }

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { css, fullWidth, variant, startAdornment, endAdornment, ...inputProps },
  forwardedRef
) {
  return (
    <InputContainer css={css} fullWidth={fullWidth} variant={variant}>
      {startAdornment ? <InputAdornment position="start">{startAdornment}</InputAdornment> : null}
      <Input {...inputProps} ref={forwardedRef} />
      {endAdornment ? <InputAdornment position="end">{endAdornment}</InputAdornment> : null}
    </InputContainer>
  )
})

export default TextField
