import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import useSWRImmutable from 'swr/immutable'

import type { MovieList } from '@tmdb/types'

import fetcher from '@lib/fetcher'

import Grid from '@components/Grid'
import Text from '@components/Text'

import MovieCard from '../MovieCard'
import MovieCardSkeleton from '../MovieCardSkeleton'

type MovieDetailsRecommendationsProps = {
  movieId: number
}

export default function MovieDetailsRecommendations({ movieId }: MovieDetailsRecommendationsProps) {
  const { locale } = useRouter()

  const { t } = useTranslation('movie-details')

  const { data, error } = useSWRImmutable<MovieList, Error>(
    `/api/tmdb/movie/${movieId}/recommendations?language=${locale}`,
    fetcher
  )

  if (error) {
    return null
  }

  return (
    <>
      <Text variant="title" gutterBottom>
        {t('recommended-movies')}
      </Text>
      <Grid
        columns={{ '@initial': 1, '@lg': 2, '@xl': 3 }}
        css={{
          mx: -8,
          '@xl': { mx: -12 },
        }}
      >
        {data
          ? data.results.map((movie) => <MovieCard key={movie.id} movie={movie} direction="row" />)
          : Array.from(Array(20)).map((_, index) => (
              <MovieCardSkeleton key={index} direction="row" />
            ))}
      </Grid>
    </>
  )
}
