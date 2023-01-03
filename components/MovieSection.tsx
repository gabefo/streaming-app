import { Icon } from '@iconify/react'
import useInView from 'hooks/useInView'
import fetcher from 'lib/fetcher'
import type { Genre, MovieList } from 'lib/tmdb/types'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import { styled } from 'stitches.config'
import useSWRImmutable from 'swr/immutable'
import Container from './Container'
import Flex from './Flex'
import IconButton from './IconButton'
import MovieCard from './MovieCard'
import MovieSkeleton from './MovieSkeleton'
import { ScrollView, View } from './ScrollView'
import Text from './Text'

const Section = styled('section', {
  mt: 24,
})

type SectionProps = {
  genre: Genre
}

export default function MovieSection({ genre }: SectionProps) {
  const { locale } = useRouter()

  const ref = useRef<HTMLDivElement>(null)

  const isInView = useInView(ref, { rootMargin: '-48px', once: true })

  const { data } = useSWRImmutable<MovieList, Error>(
    isInView
      ? `/api/tmdb/discover/movie?&language=${locale}&sort_by=popularity.desc&page=1&with_genres=${genre.id}`
      : null,
    fetcher
  )

  const movies = data?.results

  return (
    <Section ref={ref}>
      <Container gutters css={{ mb: 8 }}>
        <Flex align="center" justify="between">
          <Text as="h6" variant="title">
            {genre.name}
          </Text>
          <Link href={`/movies/genre/${genre.id}`} passHref legacyBehavior>
            <IconButton as="a" edge="end">
              <Icon icon="mdi:arrow-right" />
            </IconButton>
          </Link>
        </Flex>
      </Container>
      <Container>
        <ScrollView>
          {(movies || Array.from(Array<undefined>(24))).map((movie, index) => (
            <View key={index}>{movie ? <MovieCard movie={movie} /> : <MovieSkeleton />}</View>
          ))}
        </ScrollView>
      </Container>
    </Section>
  )
}
