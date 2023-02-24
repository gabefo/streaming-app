import React from 'react'

import { Icon } from '@iconify/react'
import * as SelectPrimitive from '@radix-ui/react-select'

import { styled } from 'stitches.config'

import Flex from './Flex'

import type { CSS } from 'stitches.config'

const SelectTrigger = styled(SelectPrimitive.Trigger, {
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  py: 7,
  pl: 11,
  pr: 7,
  gap: 8,
  outline: 0,
  border: '1px solid $border',
  borderRadius: 4,
  bg: 'transparent',
  color: '$text',
  font: 'inherit',
  fontSize: '1rem',
  fontWeight: 400,
  lineHeight: '1.5rem',
  whiteSpace: 'nowrap',
  cursor: 'pointer',
  userSelect: 'none',

  '@hover': {
    '&:hover': {
      borderColor: '$text',
    },
  },
})

const SelectIcon = styled(SelectPrimitive.Icon, {
  fontSize: 24,
  color: '$textSecondary',
})

const SelectContent = styled(SelectPrimitive.Content, {
  borderRadius: 4,
  bg: '$panel',
  boxShadow: '$8',
  overflow: 'hidden',
})

const SelectViewport = styled(SelectPrimitive.Viewport, {
  py: 8,
})

type SelectPrimitiveProps = React.ComponentProps<typeof SelectPrimitive.Root>
type SelectProps = SelectPrimitiveProps & { css?: CSS; placeholder?: React.ReactNode }

export const Select = React.forwardRef<React.ElementRef<typeof SelectTrigger>, SelectProps>(
  ({ children, css, placeholder, ...props }, forwardedRef) => (
    <SelectPrimitive.Root {...props}>
      <SelectTrigger ref={forwardedRef} css={css}>
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectIcon>
          <Icon icon="mdi:menu-down" />
        </SelectIcon>
      </SelectTrigger>
      <SelectPrimitive.Portal>
        <SelectContent>
          <SelectViewport>{children}</SelectViewport>
        </SelectContent>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  )
)

const StyledItem = styled(SelectPrimitive.Item, {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  outline: 0,
  py: 8,
  pl: 12,
  pr: 48,
  fontSize: '1rem',
  fontWeight: 400,
  lineHeight: '1.5rem',
  cursor: 'pointer',
  userSelect: 'none',

  '&[data-disabled]': {
    color: '$textDisabled',
    pointerEvents: 'none',
  },

  '&[data-highlighted]': {
    bg: '$hover',
  },
})

const SelectItemIndicator = styled(SelectPrimitive.ItemIndicator, {
  position: 'absolute',
  top: 'calc(50% - 12px)',
  right: 12,
  width: 24,
  height: 24,
  fontSize: 24,
  color: '$textSecondary',
})

type SelectItemPrimitiveProps = React.ComponentProps<typeof SelectPrimitive.Item>
type SelectItemProps = SelectItemPrimitiveProps & { css?: CSS }

export const SelectItem = React.forwardRef<React.ElementRef<typeof StyledItem>, SelectItemProps>(
  ({ children, ...props }, forwardedRef) => (
    <StyledItem {...props} ref={forwardedRef}>
      <SelectPrimitive.ItemText>
        <Flex align="center">{children}</Flex>
      </SelectPrimitive.ItemText>
      <SelectItemIndicator>
        <Icon icon="mdi:check" />
      </SelectItemIndicator>
    </StyledItem>
  )
)
