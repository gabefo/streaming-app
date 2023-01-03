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
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
})

export const ListSubheader = styled('li', {
  px: 16,
  fontSize: '0.875rem',
  fontWeight: 600,
  lineHeight: '3rem',
})
