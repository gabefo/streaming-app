import { Icon } from '@iconify/react'
import useInView from 'hooks/useInView'
import Movie from 'interfaces/movie'
import Link from 'next/link'
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

const fetcher = async (url: string) => {
  const res = await fetch(url)
  const data = await res.json()

  if (res.status !== 200) {
    throw new Error(data.message)
  }

  return data
}

const Section = styled('section', {
  mb: 24,
})

interface SectionProps {
  title: string
  genre: string
}

export default function MovieSection({ title, genre }: SectionProps) {
  const ref = useRef<HTMLDivElement>(null)

  const isInView = useInView(ref, { rootMargin: '-48px', once: true })

  const { data } = useSWRImmutable<Movie[], Error>(
    isInView ? `/api/movies?genre=${genre}` : null,
    fetcher
  )

  return (
    <Section ref={ref}>
      <Container gutters css={{ mb: 8 }}>
        <Flex align="center" justify="between">
          <Text as="h6" variant="title">
            {title}
          </Text>
          <Link href={`/movies/${genre}`} passHref legacyBehavior>
            <IconButton as="a" edge="end">
              <Icon icon="mdi:arrow-right" />
            </IconButton>
          </Link>
        </Flex>
      </Container>
      <Container>
        <ScrollView>
          {(data || Array.from<undefined>(Array(16))).map((movie, index) => (
            <View key={index}>{movie ? <MovieCard movie={movie} /> : <MovieSkeleton />}</View>
          ))}
        </ScrollView>
      </Container>
    </Section>
  )
}
