import React from 'react'

import * as TooltipPrimitive from '@radix-ui/react-tooltip'

import { keyframes, styled } from 'stitches.config'

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
})

const StyledContent = styled(TooltipPrimitive.Content, {
  py: 6,
  px: 8,
  borderRadius: 4,
  bg: '$tooltip',
  color: '$tooltipText',
  fontSize: '0.875rem',
  fontWeight: 500,
  lineHeight: '1.25rem',
  userSelect: 'none',
  willChange: 'opacity',

  '&[data-state="delayed-open"]': {
    animation: `${fadeIn} 0.1s`,
  },
})

type TooltipPrimitiveProps = React.ComponentProps<typeof TooltipPrimitive.Root>
type TooltipProps = TooltipPrimitiveProps &
  React.ComponentProps<typeof TooltipPrimitive.Content> & {
    children: React.ReactNode
    content: React.ReactNode
  }

export default function Tooltip({
  children,
  content,
  open,
  defaultOpen,
  onOpenChange,
  delayDuration,
  disableHoverableContent,
  ...props
}: TooltipProps) {
  return (
    <TooltipPrimitive.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      delayDuration={delayDuration}
      disableHoverableContent={disableHoverableContent}
    >
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <StyledContent side="bottom" sideOffset={8} collisionPadding={12} {...props}>
          {content}
        </StyledContent>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  )
}
