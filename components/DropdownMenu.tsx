import { Icon } from '@iconify/react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import React from 'react'
import { css, styled } from 'stitches.config'
import type { CSS } from 'stitches.config'
import Grow from './Grow'

export const DropdownMenu = DropdownMenuPrimitive.Root

export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const contentCss = css({
  minWidth: 180,
  py: 8,
  borderRadius: 4,
  bg: '$panel',
  boxShadow: '0 4px 32px rgba(0, 0, 0, 0.1)',
})

const StyledContent = styled(DropdownMenuPrimitive.Content, contentCss)

type DropdownMenuContentPrimitiveProps = React.ComponentProps<typeof DropdownMenuPrimitive.Content>
type DropdownMenuContentProps = DropdownMenuContentPrimitiveProps & { css?: CSS }

export const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof StyledContent>,
  DropdownMenuContentProps
>(function DrodpwonMenuContent(props, forwardedRef) {
  return (
    <DropdownMenuPrimitive.Portal>
      <StyledContent sideOffset={8} collisionPadding={12} {...props} ref={forwardedRef} />
    </DropdownMenuPrimitive.Portal>
  )
})

export const DropdownMenuLabel = styled(DropdownMenuPrimitive.Label, {})

const itemCss = css({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  minHeight: 40,
  py: 8,
  pr: 48,
  pl: 16,
  fontSize: '1rem',
  fontWeight: 400,
  lineHeight: '1.5rem',
  color: '$text',
  userSelect: 'none',
  outline: 'none',
  cursor: 'pointer',

  '&[data-disabled]': {
    pointerEvents: 'none',
  },

  '&[data-highlighted]': {
    bg: '$hover',
  },
})

export const DropdownMenuItem = styled(DropdownMenuPrimitive.Item, itemCss)

export const DropdownMenuItemIcon = styled('div', {
  display: 'inline-flex',
  fontSize: 24,
  color: '$textSecondary',
})

export const DropdownMenuGroup = styled(DropdownMenuPrimitive.Group, {})

const StyledDropdownMenuCheckboxItem = styled(DropdownMenuPrimitive.CheckboxItem, itemCss, {
  '&[data-state="unchecked"]': {
    pl: 56,
  },
})

const StyledDropdownMenuItemIndicator = styled(DropdownMenuPrimitive.ItemIndicator, {
  mr: 16,
  fontSize: 24,
  color: '$textSecondary',
  pointerEvents: 'none',
})

type DropdownMenuCheckboxItemPrimitiveProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.CheckboxItem
>
type DropdownMenuCheckboxItemProps = DropdownMenuCheckboxItemPrimitiveProps & { css?: CSS }

export const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof StyledDropdownMenuCheckboxItem>,
  DropdownMenuCheckboxItemProps
>(function DropdownMenuCheckboxItem({ children, ...props }, forwardedRef) {
  return (
    <StyledDropdownMenuCheckboxItem {...props} ref={forwardedRef}>
      <StyledDropdownMenuItemIndicator>
        <Icon icon="mdi:check" />
      </StyledDropdownMenuItemIndicator>
      <Grow>{children}</Grow>
    </StyledDropdownMenuCheckboxItem>
  )
})

export const DropdownMenuRadioGroup = styled(DropdownMenuPrimitive.RadioGroup, {})

const StyledDropdownMenuRadioItem = styled(DropdownMenuPrimitive.RadioItem, itemCss, {
  '&[data-state="unchecked"]': {
    pl: 56,
  },
})

type DropdownMenuRadioItemPrimitiveProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.RadioItem
>
type DropdownMenuRadioItemProps = DropdownMenuRadioItemPrimitiveProps & { css?: CSS }

export const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof StyledDropdownMenuRadioItem>,
  DropdownMenuRadioItemProps
>(function DropdownMenuRadioItem({ children, ...props }, forwardedRef) {
  return (
    <StyledDropdownMenuRadioItem {...props} ref={forwardedRef}>
      <StyledDropdownMenuItemIndicator>
        <Icon icon="mdi:check" />
      </StyledDropdownMenuItemIndicator>
      <Grow>{children}</Grow>
    </StyledDropdownMenuRadioItem>
  )
})

export const DropdownMenuSeparator = styled(DropdownMenuPrimitive.Separator, {
  borderBottom: '1px solid $hover',
})

export const DropdownMenuSub = DropdownMenuPrimitive.Sub

const StyledDropdownMenuSubTrigger = styled(DropdownMenuPrimitive.SubTrigger, itemCss, {
  pr: 16,

  '&[data-state="open"]': {
    bg: '$hover',
  },
})

const RightSlot = styled('div', {
  ml: 8,
  fontSize: 24,
  color: '$textSecondary',
  pointerEvents: 'none',
})

type DropdownMenuSubTriggerPrimitiveProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.SubTrigger
>
type DropdownMenuSubTriggerProps = DropdownMenuSubTriggerPrimitiveProps & { css?: CSS }

export const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof StyledDropdownMenuSubTrigger>,
  DropdownMenuSubTriggerProps
>(function DropdownMenuSubTrigger({ children, ...props }, forwardedRef) {
  return (
    <StyledDropdownMenuSubTrigger {...props} ref={forwardedRef}>
      <Grow>{children}</Grow>
      <RightSlot>
        <Icon icon="mdi:chevron-right" />
      </RightSlot>
    </StyledDropdownMenuSubTrigger>
  )
})

const StyledSubContent = styled(DropdownMenuPrimitive.SubContent, contentCss)

type DropdownMenuSubContentPrimitiveProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.SubContent
>
type DropdownMenuSubContentProps = DropdownMenuSubContentPrimitiveProps & { css?: CSS }

export const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof StyledSubContent>,
  DropdownMenuSubContentProps
>(function DropdownMenuSubContent(props, forwardedRef) {
  return (
    <DropdownMenuPrimitive.Portal>
      <StyledSubContent collisionPadding={12} {...props} ref={forwardedRef} />
    </DropdownMenuPrimitive.Portal>
  )
})
