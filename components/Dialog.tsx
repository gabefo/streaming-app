import React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { keyframes, styled } from 'stitches.config'
import type { CSS, VariantProps } from 'stitches.config'

export const Dialog = DialogPrimitive.Root

export const DialogTrigger = DialogPrimitive.Trigger

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
})

const fadeOut = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 },
})

const StyledOverlay = styled(DialogPrimitive.Overlay, {
  position: 'fixed',
  inset: 0,
  bg: 'rgba(0, 0, 0, 0.8)',
  willChange: 'opacity',

  '&[data-state="open"]': {
    animation: `${fadeIn} 0.1s`,
  },

  '&[data-state="closed"]': {
    animation: `${fadeOut} 0.1s`,
  },
})

const StyledContent = styled(DialogPrimitive.Content, {
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  bg: '$panel',
  color: '$text',
  boxShadow: '0 4px 32px rgba(0, 0, 0, 0.1)',
  overflow: 'auto',

  '&:focus': {
    outline: 'none',
  },

  '@md': {
    top: '50%',
    left: '50%',
    bottom: 'auto',
    right: 'auto',
    borderRadius: 8,
    transform: 'translate(-50%, -50%)',
  },
})

type DialogContentPrimitiveProps = React.ComponentProps<typeof DialogPrimitive.Content>
type DialogContentVariants = VariantProps<typeof StyledContent>
type DialogContentProps = DialogContentPrimitiveProps & DialogContentVariants & { css?: CSS }

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof StyledContent>,
  DialogContentProps
>(function DialogContent({ children, ...props }, forwardedRef) {
  return (
    <DialogPrimitive.Portal>
      <StyledOverlay />
      <StyledContent {...props} ref={forwardedRef}>
        {children}
      </StyledContent>
    </DialogPrimitive.Portal>
  )
})

export const DialogClose = DialogPrimitive.Close

export const DialogTitle = styled(DialogPrimitive.Title, {
  m: 0,
  p: 24,
  pr: 72,
  fontSize: '1.25rem',
  fontWeight: 600,
  lineHeight: '1.5rem',
  flex: '0 0 auto',
})

export const DialogDescription = DialogPrimitive.Description
