import React from 'react'

import * as DialogPrimitive from '@radix-ui/react-dialog'

import { styled } from 'stitches.config'

import type { CSS, VariantProps } from 'stitches.config'

export const Dialog = DialogPrimitive.Root

export const DialogTrigger = DialogPrimitive.Trigger

const StyledOverlay = styled(DialogPrimitive.Overlay, {
  position: 'fixed',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  bg: 'rgba(0, 0, 0, 0.8)',
})

const StyledContent = styled(DialogPrimitive.Content, {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  outline: 0,
  bg: '$panel',
  color: '$text',
  boxShadow: '$24',
  overflow: 'hidden',

  variants: {
    width: {
      xs: {
        width: 280,
      },
      sm: {
        width: 360,
      },
      md: {
        width: 480,
      },
      lg: {
        width: 600,
      },
    },
    variant: {
      standard: {
        maxWidth: 'calc(100% - 64px)',
        maxHeight: 'calc(100% - 64px)',
        borderRadius: 4,
      },
      fullscreen: {
        width: '100%',
        height: '100%',
        maxWidth: 'none',
        maxHeight: 'none',
        borderRadius: 0,
      },
    },
  },

  defaultVariants: {
    variant: 'standard',
  },
})

type DialogContentPrimitiveProps = React.ComponentProps<typeof DialogPrimitive.Content>
type DialogContentVariants = VariantProps<typeof StyledContent>
type DialogContentProps = DialogContentPrimitiveProps & DialogContentVariants & { css?: CSS }

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof StyledContent>,
  DialogContentProps
>(({ children, ...props }, forwardedRef) => (
  <DialogPrimitive.Portal>
    <StyledOverlay>
      <StyledContent {...props} ref={forwardedRef}>
        {children}
      </StyledContent>
    </StyledOverlay>
  </DialogPrimitive.Portal>
))

export const DialogClose = DialogPrimitive.Close

export const DialogHeader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  minHeight: 57,
  flexShrink: 0,
  px: 4,
  borderBottom: '1px solid $border',
})

export const DialogTitle = styled(DialogPrimitive.Title, {
  m: 0,
  fontSize: '1.125rem',
  fontWeight: 500,
  lineHeight: '1.5rem',
})

export const DialogDescription = DialogPrimitive.Description
