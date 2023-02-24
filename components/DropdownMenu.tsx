import React from 'react'

import { Icon } from '@iconify/react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'

import { css, keyframes, styled } from 'stitches.config'

import type { CSS } from 'stitches.config'

export const DropdownMenu = DropdownMenuPrimitive.Root

export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const ZoomIn = keyframes({
  '0%': { opacity: 0, transform: 'scale(0.9)' },
  '30%': { opacity: 1 },
  '100%': { transform: 'scale(1)' },
})

const fadeOut = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 },
})

const StyledContent = styled(DropdownMenuPrimitive.Content, {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  py: 8,
  borderRadius: 4,
  bg: '$panel',
  boxShadow: '$8',
  overflow: 'hidden',
  transformOrigin: 'var(--radix-dropdown-menu-content-transform-origin)',
  willChange: 'transform, opacity',

  '&[data-state="open"]': {
    animation: `${ZoomIn} 0.15s cubic-bezier(0.4, 0, 0.2, 1)`,
  },

  '&[data-state="closed"]': {
    animation: `${fadeOut} 0.15s linear`,
  },
})

type DropdownMenuContentPrimitiveProps = React.ComponentProps<typeof DropdownMenuPrimitive.Content>
type DropdownMenuContentProps = DropdownMenuContentPrimitiveProps & { css?: CSS }

export const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof StyledContent>,
  DropdownMenuContentProps
>(({ children, ...props }, forwardedRef) => (
  <DropdownMenuPrimitive.Portal>
    <StyledContent align="start" {...props} ref={forwardedRef}>
      {children}
    </StyledContent>
  </DropdownMenuPrimitive.Portal>
))

export const DropdownMenuLabel = styled(DropdownMenuPrimitive.Label, {})

const itemCss = css({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  height: 40,
  px: 24,
  outline: 0,
  fontSize: '1rem',
  fontWeight: 400,
  lineHeight: '1.5rem',
  color: '$text',
  userSelect: 'none',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease-in-out',

  '&[data-disabled]': {
    color: '$textDisabled',
    pointerEvents: 'none',
  },

  '&[data-highlighted], &[data-state="checked"]': {
    bg: '$hover',
  },
})

export const DropdownMenuItem = styled(DropdownMenuPrimitive.Item, itemCss)

export const DropdownMenuGroup = styled(DropdownMenuPrimitive.Group, {})

const StyledCheckboxItem = styled(DropdownMenuPrimitive.CheckboxItem, itemCss, {
  pl: 48,
})

const StyledIndicator = styled(DropdownMenuPrimitive.ItemIndicator, {
  position: 'absolute',
  top: 'calc(50% - 12px)',
  left: 12,
  fontSize: 24,
  color: '$textSecondary',
})

type DropdownMenuCheckboxItemPrimitiveProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.CheckboxItem
>
type DropdownMenuCheckboxItemProps = DropdownMenuCheckboxItemPrimitiveProps & { css?: CSS }

export const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof StyledCheckboxItem>,
  DropdownMenuCheckboxItemProps
>(({ children, ...props }, forwardedRef) => (
  <StyledCheckboxItem {...props} ref={forwardedRef}>
    <StyledIndicator>
      <Icon icon="mdi:check" />
    </StyledIndicator>
    {children}
  </StyledCheckboxItem>
))

export const DropdownMenuRadioGroup = styled(DropdownMenuPrimitive.RadioGroup, {})

export const DropdownMenuRadioItem = styled(DropdownMenuPrimitive.RadioItem, itemCss)

export const DropdownMenuSeparator = styled(DropdownMenuPrimitive.Separator, {
  borderBottom: '1px solid $hover',
})
