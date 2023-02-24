import { styled } from 'stitches.config'

import ButtonBase from './ButtonBase'

export const ListItem = styled('li', {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
})

export const ListItemAvatar = styled('div', {
  display: 'inline-flex',
  alignItems: 'center',
  minWidth: 40,
  flexShrink: 0,
})

export const ListItemButton = styled(ButtonBase, {
  flexGrow: 1,
  py: 8,
  px: 16,
  fontSize: '1rem',
  fontWeight: 400,
  lineHeight: '1.5rem',
  textAlign: 'left',
  transition: 'background-color 0.2s ease-in-out',

  '@hover': {
    '&:hover': {
      bg: '$hover',
    },
  },

  '&:active': {
    bg: '$active',
  },
})

export const ListItemIcon = styled('div', {
  display: 'inline-flex',
  alignItems: 'center',
  minWidth: 40,
  flexShrink: 0,
  color: '$textDisabled',
  fontSize: 24,
})

export const ListItemSecondaryAction = styled('div', {
  display: 'flex',
  alignItems: 'center',
})

const ListItemTextRoot = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  my: 4,
  flex: '1 1 auto',

  variants: {
    inset: {
      true: {
        pl: 40,
      },
    },
  },
})

const ListItemTextPrimary = styled('div', {
  fontSize: '1rem',
  fontWeight: 400,
  lineHeight: '1.5rem',
})

const ListItemTextSecondary = styled('div', {
  fontSize: '0.875rem',
  fontWeight: 400,
  lineHeight: '1.25rem',
  color: '$textSecondary',
})

type ListItemTextProps = {
  primary: string
  secondary?: string
}

export function ListItemText({ primary, secondary }: ListItemTextProps) {
  return (
    <ListItemTextRoot>
      <ListItemTextPrimary>{primary}</ListItemTextPrimary>
      {secondary ? <ListItemTextSecondary>{secondary}</ListItemTextSecondary> : null}
    </ListItemTextRoot>
  )
}

export const ListSubheader = styled('li', {
  display: 'flex',
  alignItems: 'center',
  height: 48,
  px: 16,
  color: '$textSecondary',
  fontSize: '0.875rem',
  fontWeight: 500,
  lineHeight: '1.25rem',
})

export const List = styled('ul', {
  m: 0,
  p: 0,
  px: 0,
  listStyle: 'none',

  variants: {
    dense: {
      true: {
        [`& ${ListItemButton}`]: {
          py: 4,
        },

        [`& ${ListItemTextPrimary}`]: {
          fontSize: '0.875rem',
          lineHeight: '1.25rem',
        },

        [`& ${ListSubheader}`]: {
          height: 36,
        },
      },
    },
    padding: {
      true: {
        py: 8,
      },
    },
  },
})
