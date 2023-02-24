import { useRouter } from 'next/router'
import useSWRInfinite from 'swr/infinite'

import { MovieList } from '@tmdb/types'

import fetcher from '@lib/fetcher'

import Box from '@components/Box'
import Carousel from '@components/Carousel'
import Text from '@components/Text'

import MovieCard from './MovieCard'
import MovieCardSkeleton from './MovieCardSkeleton'

export default function MovieTopRated() {
  const { locale } = useRouter()

  const { data, size, setSize } = useSWRInfinite<MovieList, Error>(
    (index) => `/api/tmdb/movie/top_rated?language=${locale}&page=${index + 1}`,
    fetcher,
    { revalidateFirstPage: false }
  )

  const movies = data ? data.flatMap(({ results }) => results) : []

  return (
    <Box css={{ pt: 40 }}>
      <Text variant="title" gutterBottom>
        Top rated
      </Text>
      <Carousel
        dots={false}
        infinite={false}
        slidesToShow={3}
        slidesToScroll={3}
        rows={3}
        slidesPerRow={1}
        responsive={[
          {
            breakpoint: 1279,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 959,
            settings: {
              slidesToShow: 1.5,
              slidesToScroll: 1,
            },
          },
        ]}
        css={{
          mx: -24,

          '& .slick-slider': {
            px: 16,
          },

          '& .slick-list': {
            overflow: 'visible',
          },

          '@lg': {
            '& .slick-list': {
              overflow: 'hidden',
            },
          },

          '@xl': {
            '& .slick-slider': {
              px: 12,
            },
          },
        }}
      >
        {movies.map((movie, i) => (
          <div key={movie.id}>
            <MovieCard direction="row" movie={movie} index={i + 1} />
          </div>
        ))}
        {Array.from(Array(60 - movies.length)).map((_, i) => (
          <div key={i}>
            <MovieCardSkeleton direction="row" index={i + 1 + movies.length} />
          </div>
        ))}
      </Carousel>
    </Box>
  )
}
