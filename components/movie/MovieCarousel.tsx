import { useRef } from 'react'

import { Icon } from '@iconify/react'
import { useInView } from 'framer-motion'
import Link from 'next/link'
import useSWRImmutable from 'swr/immutable'

import { MovieList } from '@tmdb/types'

import fetcher from '@lib/fetcher'

import Box from '@components/Box'
import Carousel from '@components/Carousel'
import Flex from '@components/Flex'
import Grid from '@components/Grid'
import IconButton from '@components/IconButton'
import Text from '@components/Text'

import MovieCard from './MovieCard'
import MovieCardSkeleton from './MovieCardSkeleton'

type MovieCarouselProps = {
  title: string
  src: string
  path: string
}

export default function MovieCarousel({ title, src, path }: MovieCarouselProps) {
  const ref = useRef<HTMLDivElement>(null)

  const isInView = useInView(ref, { once: true })

  const { data } = useSWRImmutable<MovieList, Error>(isInView ? src : null, fetcher)

  return (
    <Box ref={ref} css={{ mt: 32 }}>
      <Flex align="center" justify="between" css={{ '@lg': { mb: 8 } }}>
        <Text variant="title">{title}</Text>
        <IconButton as={Link} href={path} edge="end">
          <Icon icon="mdi:arrow-right" />
        </IconButton>
      </Flex>
      {data ? (
        <Carousel
          arrowOffset={-40}
          dots={false}
          infinite={false}
          slidesToShow={6}
          slidesToScroll={6}
          responsive={[
            {
              breakpoint: 1279,
              settings: {
                slidesToShow: 5,
                slidesToScroll: 5,
              },
            },
            {
              breakpoint: 959,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
              },
            },
            {
              breakpoint: 599,
              settings: {
                slidesToShow: 3,
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

            '@xl': {
              '& .slick-slider': {
                px: 12,
              },

              '& .slick-list': {
                overflow: 'hidden',
              },
            },
          }}
        >
          {data.results.map((movie) => (
            <div key={movie.id}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </Carousel>
      ) : (
        <Grid
          rows={1}
          columns={{ '@initial': 3, '@sm': 4, '@lg': 5, '@xl': 6 }}
          css={{ mx: -8, '@xl': { mx: -12 } }}
        >
          {Array.from(Array(6)).map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </Grid>
      )}
    </Box>
  )
}
