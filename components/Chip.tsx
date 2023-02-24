import React from 'react'

import { Icon } from '@iconify/react'

import { styled } from 'stitches.config'

import ButtonBase from './ButtonBase'

const Root = styled(ButtonBase, {
  height: 32,
  px: 8,
  border: '1px solid $border',
  borderRadius: 8,
  color: '$textSecondary',
  fontSize: '0.875rem',
  fontWeight: 500,
  lineHeight: '1.25rem',
  transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out',

  '@hover': {
    '&:hover': {
      bg: '$hover',
    },
  },

  variants: {
    selected: {
      true: {
        borderColor: 'transparent',
        bg: '$primaryTransparent !important',
        color: '$primary',
      },
    },
  },
})

const Label = styled('span', {
  px: 8,
})

const Chip = React.forwardRef<React.ElementRef<typeof Root>, React.ComponentProps<typeof Root>>(
  ({ children, ...props }, forwardedRef) => (
    <Root {...props} ref={forwardedRef}>
      {props.selected && <Icon icon="mdi:check" fontSize={18} />}
      <Label>{children}</Label>
    </Root>
  )
)

export default Chip
