import { styled } from 'stitches.config'

export const List = styled('ul', {
  m: 0,
  py: 8,
  px: 0,
  listStyle: 'none',
})

export const ListItem = styled('li', {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
})

export const ListItemButton = styled('button', {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  minWidth: 0,
  flexGrow: 1,
  m: 0,
  py: 8,
  px: 16,
  border: 0,
  borderRadius: 0,
  outline: 0,
  bg: 'transparent',
  color: 'inherit',
  font: 'inherit',
  textAlign: 'left',
  textDecoration: 'none',
  userSelect: 'none',
  cursor: 'pointer',
  transition: 'background-color 0.1s',

  '&:hover': {
    bg: '$hover',
  },
})

export const ListItemIcon = styled('div', {
  display: 'inline-flex',
  alignItems: 'center',
  minWidth: 40,
  flexShrink: 0,
  fontSize: 24,
  color: '$textSecondary',
})

export const ListItemText = styled('div', {
  flex: '1 1 auto',

  variants: {
    inset: {
      true: {
        pl: 40,
      },
    },
  },
})

export const ListSubheader = styled('li', {
  px: 16,
  fontSize: '0.875rem',
  fontWeight: 600,
  lineHeight: '3rem',
})
