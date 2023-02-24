import React from 'react'

import { Icon } from '@iconify/react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'

import { styled, CSS } from 'stitches.config'

const StyledCheckbox = styled(CheckboxPrimitive.Root, {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  m: 3,
  p: 0,
  width: 18,
  height: 18,
  border: '2px solid $checkbox',
  borderRadius: 2,
  outline: 0,
  bg: 'transparent',
  overflow: 'hidden',

  '&[data-state="checked"]': {
    bg: '$primary',
    borderColor: 'transparent',
  },
})

const StyledIndicator = styled(CheckboxPrimitive.Indicator, {
  fontSize: 18,
  color: '$primaryText',
})

type CheckboxPrimitiveProps = React.ComponentProps<typeof CheckboxPrimitive.Root>
type CheckboxProps = CheckboxPrimitiveProps & { css?: CSS }

export const Checkbox = React.forwardRef<React.ElementRef<typeof StyledCheckbox>, CheckboxProps>(
  (props, forwardedRef) => (
    <StyledCheckbox {...props} ref={forwardedRef}>
      <StyledIndicator>
        <Icon icon="mdi:check" />
      </StyledIndicator>
    </StyledCheckbox>
  )
)
