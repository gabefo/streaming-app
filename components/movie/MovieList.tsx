import { useCallback } from 'react'

import useSWRInfinite from 'swr/infinite'

import type { MovieList } from '@tmdb/types'

import fetcher from '@lib/fetcher'

import Grid from '@components/Grid'
import LoadMore from '@components/LoadMore'
import Text from '@components/Text'

import MovieCard from './MovieCard'
import MovieCardSkeleton from './MovieCardSkeleton'

type MovieListProps = {
  title: string
  getSrc: (index: number) => string
}

export default function MovieList({ title, getSrc }: MovieListProps) {
  const { data, error, size, setSize } = useSWRInfinite<MovieList, Error>(getSrc, fetcher, {
    revalidateFirstPage: false,
  })

  const movies = data ? data.flatMap(({ results }) => results) : []
  const isLoadingInitialData = !data && !error
  const hasMore = data && data[data.length - 1].total_pages > size + 1

  const handleLoadMore = useCallback(() => {
    setSize((prevSize) => prevSize + 1)
  }, [setSize])

  return (
    <>
      <Text variant="title" gutterBottom>
        {title}
      </Text>
      <Grid
        columns={{ '@initial': 3, '@sm': 4, '@lg': 5, '@xl': 6 }}
        css={{
          mx: -8,
          '@xl': { mx: -12 },
        }}
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
        {isLoadingInitialData
          ? Array.from(Array(20)).map((_, index) => <MovieCardSkeleton key={index} />)
          : null}
      </Grid>
      {hasMore && <LoadMore onLoadMore={handleLoadMore} />}
    </>
  )
}
