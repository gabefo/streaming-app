import React from 'react'

import { Icon } from '@iconify/react'
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'

import { styled } from 'stitches.config'

const Root = styled(CollapsiblePrimitive.Root, {
  display: 'flex',
  flexDirection: 'column',
})

const StyledTrigger = styled(CollapsiblePrimitive.Trigger, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: 48,
  px: 12,
  borderRadius: 8,
  color: '$textSecondary',
  fontSize: '1rem',
  fontWeight: 500,
  lineHeight: '1.5rem',
  transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out',

  '@hover': {
    '&:hover': {
      bg: '$hover',
      color: '$textPrimary',
    },
  },

  '&:active': {
    bg: '$active',
  },
})

const Arrow = styled('div', {
  fontSize: 24,
  transition: 'transform 0.1s ease-out',

  '[data-state="open"] > &': {
    transform: 'rotate(90deg)',
  },
})

type CollapsiblePrimitiveProps = React.ComponentProps<typeof CollapsiblePrimitive.Root>
type CollapsibleProps = CollapsiblePrimitiveProps & { children: React.ReactNode; title: string }

export default function Collapsible({ children, title, ...props }: CollapsibleProps) {
  return (
    <Root {...props}>
      <StyledTrigger>
        {title}
        <Arrow>
          <Icon icon="mdi:chevron-right" />
        </Arrow>
      </StyledTrigger>
      <CollapsiblePrimitive.Content>{children}</CollapsiblePrimitive.Content>
    </Root>
  )
}
