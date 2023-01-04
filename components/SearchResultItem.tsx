import { Icon } from '@iconify/react'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import Link from 'next/link'
import type { MouseEventHandler } from 'react'
import { styled } from 'stitches.config'
import { ListItem } from './List'

const StyledLink = styled(Link, {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: 36,
  px: 16,
  color: 'inherit',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  textDecoration: 'none',

  '&:hover': {
    bg: '$hover',
  },
})

const StyledIcon = styled(Icon, {
  mr: 16,
  color: '$textSecondary',
  fontSize: 18,
})

type SearchResultItem = {
  query: string
  title: string
  href: string
  onClick?: MouseEventHandler<HTMLLIElement>
}

export default function SearchResultItem({ query, title, href, onClick }: SearchResultItem) {
  const matches = match(title, query)
  const parts = parse(title, matches)

  return (
    <ListItem onClick={onClick}>
      <StyledLink href={href}>
        <StyledIcon icon="mdi:search" />
        <div>
          {parts.map((part, index) =>
            part.highlight ? <b key={index}>{part.text}</b> : part.text
          )}
        </div>
      </StyledLink>
    </ListItem>
  )
}
