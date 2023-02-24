import { styled } from 'stitches.config'

import Text from './Text'

const List = styled('ul', {
  m: 0,
  pl: 20,
})

type SearchNotFoundProps = {
  query: string
}

export default function SearchNotFound({ query }: SearchNotFoundProps) {
  return (
    <>
      <Text variant="subtitle" gutterBottom>
        No results for &quot;{query}&quot;.
      </Text>
      <List>
        <li>Make sure that all words are spelled correctly.</li>
        <li>Try different keywords.</li>
        <li>Try more general keywords.</li>
        <li>Try fewer keywords.</li>
      </List>
    </>
  )
}
