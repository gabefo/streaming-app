import React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { styled } from 'stitches.config'
import type { CSS } from 'stitches.config'
import { Icon } from '@iconify/react'
import Flex from './Flex'

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
  font: '$openSans',
  fontSize: '1rem',
  fontWeight: 400,
  lineHeight: '1.5rem',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  cursor: 'pointer',
  userSelect: 'none',

  '&:hover': {
    borderColor: '$text',
  },
})

const SelectIcon = styled(SelectPrimitive.Icon, {
  fontSize: 24,
  color: '$textSecondary',
})

const SelectContent = styled(SelectPrimitive.Content, {
  borderRadius: 4,
  bg: '$panel',
  boxShadow: '0 4px 32px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
})

const SelectViewport = styled(SelectPrimitive.Viewport, {
  py: 8,
})

type SelectPrimitiveProps = React.ComponentProps<typeof SelectPrimitive.Root>
type SelectProps = SelectPrimitiveProps & { css?: CSS }

export const Select = React.forwardRef<React.ElementRef<typeof SelectTrigger>, SelectProps>(
  function Select({ children, ...props }, forwardedRef) {
    return (
      <SelectPrimitive.Root {...props}>
        <SelectTrigger ref={forwardedRef}>
          <SelectPrimitive.Value />
          <SelectIcon>
            <Icon icon="mdi:menu-down" />
          </SelectIcon>
        </SelectTrigger>
        <SelectPrimitive.Portal>
          <SelectContent>
            <SelectPrimitive.ScrollUpButton>
              <Icon icon="mdi:menu-up" />
            </SelectPrimitive.ScrollUpButton>
            <SelectViewport>{children}</SelectViewport>
            <SelectPrimitive.ScrollDownButton>
              <Icon icon="mdi:menu-down" />
            </SelectPrimitive.ScrollDownButton>
          </SelectContent>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    )
  }
)

const StyledItem = styled(SelectPrimitive.Item, {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
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
    outline: 'none',
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
  function SelectItem({ children, ...props }, forwardedRef) {
    return (
      <StyledItem {...props} ref={forwardedRef}>
        <SelectPrimitive.ItemText>
          <Flex align="center">{children}</Flex>
        </SelectPrimitive.ItemText>
        <SelectItemIndicator>
          <Icon icon="mdi:check" />
        </SelectItemIndicator>
      </StyledItem>
    )
  }
)
