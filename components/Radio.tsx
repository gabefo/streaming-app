import React from 'react'

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'

import { styled } from 'stitches.config'

import type { CSS } from 'stitches.config'

export const RadioGroup = styled(RadioGroupPrimitive.Root, {
  display: 'flex',

  '&[data-orientation="vertical"]': {
    flexDirection: 'column',
  },
})

const StyledRadio = styled(RadioGroupPrimitive.Item, {
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 20,
  height: 20,
  m: 2,
  p: 0,
  border: '2px solid currentColor',
  borderRadius: '50%',
  outline: 0,
  bg: 'transparent',
  boxShadow: 'none',
  color: '$textSecondary',
  userSelect: 'none',
  cursor: 'pointer',

  '&::after': {
    content: '""',
    position: 'absolute',
    top: 'calc(50% - 24px)',
    left: 'calc(50% - 24px)',
    width: 48,
    height: 48,
    borderRadius: '50%',
    bg: 'currentColor',
    opacity: 0,
    transform: 'scale(0)',
  },

  '&:active::after': {
    opacity: 0.1,
    transform: 'scale(1)',
    transition: 'opacity 0.2s, transform 0.2s',
  },

  '&[data-state="checked"]': {
    color: '$primary',
  },
})

const StyledIndicator = styled(RadioGroupPrimitive.Indicator, {
  width: 10,
  height: 10,
  borderRadius: '50%',
  bg: 'currentColor',
  transition: 'transform 0.15s ease-out',

  '&[data-state="checked"]': {
    transform: 'scale(1)',
  },

  '&[data-state="unchecked"]': {
    transform: 'scale(0)',
  },
})

type RadioGroupItemPrimitiveProps = React.ComponentProps<typeof RadioGroupPrimitive.Item>
type RadioProps = RadioGroupItemPrimitiveProps & { css?: CSS }

export const Radio = React.forwardRef<React.ElementRef<typeof StyledRadio>, RadioProps>(
  (props, forwardedRef) => (
    <StyledRadio {...props} ref={forwardedRef}>
      <StyledIndicator forceMount />
    </StyledRadio>
  )
)
