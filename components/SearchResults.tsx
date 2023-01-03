import type {
  MovieWithMediaType,
  PersonWithMediaType,
  SearchMultipleResult,
  TVWithMediaType,
} from 'lib/tmdb/types'
import { useMemo } from 'react'
import type { MouseEventHandler } from 'react'
import { useTranslation } from 'react-i18next'
import { styled } from 'stitches.config'
import type { CSS } from 'stitches.config'
import { List, ListSubheader } from './List'
import SearchResultItem from './SearchResultItem'

const Panel = styled('div', {
  overflow: 'auto',
})

type SearchResultsProps = {
  css?: CSS
  query: string
  results: SearchMultipleResult[] | null
  onItemClick?: MouseEventHandler<HTMLLIElement>
}

export default function SearchResults({
  query,
  results,
  onItemClick,
  ...props
}: SearchResultsProps) {
  const { t } = useTranslation('common')

  const hasResults = results && results.length > 0

  const [movies, shows, people] = useMemo(() => {
    const movies: MovieWithMediaType[] = []
    const shows: TVWithMediaType[] = []
    const people: PersonWithMediaType[] = []

    if (results) {
      for (const result of results) {
        switch (result.media_type) {
          case 'movie':
            movies.push(result)
            break
          case 'tv':
            shows.push(result)
            break
          case 'person':
            people.push(result)
            break
        }
      }
    }

    return [movies, shows, people]
  }, [results])

  if (!hasResults) {
    return null
  }

  return (
    <Panel {...props}>
      <List>
        {movies.length ? (
          <>
            <ListSubheader>{t('movies')}</ListSubheader>
            {movies.map((movie) => (
              <SearchResultItem
                key={movie.id}
                query={query}
                title={movie.title}
                href={`/movies/${movie.id}`}
                onClick={onItemClick}
              />
            ))}
          </>
        ) : null}
        {shows.length ? (
          <>
            <ListSubheader>{t('shows')}</ListSubheader>
            {shows.map((show) => (
              <SearchResultItem
                key={show.id}
                query={query}
                title={show.name}
                href={`/shows/${show.id}`}
                onClick={onItemClick}
              />
            ))}
          </>
        ) : null}
        {people.length ? (
          <>
            <ListSubheader>{t('people')}</ListSubheader>
            {people.map((person) => (
              <SearchResultItem
                key={person.id}
                query={query}
                title={person.name}
                href={`/people/${person.id}`}
                onClick={onItemClick}
              />
            ))}
          </>
        ) : null}
      </List>
    </Panel>
  )
}
