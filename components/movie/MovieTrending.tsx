import useSWR from 'swr'

import { MovieList } from '@tmdb/types'

import fetcher from '@lib/fetcher'

import Box from '@components/Box'
import Carousel from '@components/Carousel'
import Skeleton from '@components/Skeleton'

import MovieSlide from './MovieSlide'

export default function MovieTrending() {
  const { data } = useSWR<MovieList, Error>('/api/tmdb/trending/movie/day', fetcher)

  const movies = data?.results.slice(0, 5)

  if (!movies) {
    return (
      <Box
        css={{
          height: 152,

          '@sm': {
            height: 'auto',
            aspectRatio: '4 / 1',
          },
        }}
      >
        <Skeleton variant="rounded" css={{ height: '100%' }} />
      </Box>
    )
  }

  return (
    <Carousel
      dots
      arrows={false}
      infinite
      slidesToShow={1}
      slidesToScroll={1}
      autoplay
      autoplaySpeed={5000}
      css={{
        borderRadius: 8,
        boxShadow: '$1',
        overflow: 'hidden',
      }}
    >
      {movies.map((movie) => (
        <MovieSlide key={movie.id} movie={movie} />
      ))}
    </Carousel>
  )
}
