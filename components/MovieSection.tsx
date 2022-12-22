import { Icon } from '@iconify/react'
import useInView from 'hooks/useInView'
import Category from 'interfaces/category'
import Movie from 'interfaces/movie'
import fetcher from 'lib/fetcher'
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

const Section = styled('section', {
  mt: 24,
})

interface SectionProps {
  category: Category
}

export default function MovieSection({ category }: SectionProps) {
  const ref = useRef<HTMLDivElement>(null)

  const isInView = useInView(ref, { rootMargin: '-48px', once: true })

  const { data } = useSWRImmutable<Movie[], Error>(
    isInView ? `/api/movies?category=${category.id}` : null,
    fetcher
  )

  return (
    <Section ref={ref}>
      <Container gutters css={{ mb: 8 }}>
        <Flex align="center" justify="between">
          <Text as="h6" variant="title">
            {category.name}
          </Text>
          <Link href={category.href} passHref legacyBehavior>
            <IconButton as="a" edge="end">
              <Icon icon="mdi:arrow-right" />
            </IconButton>
          </Link>
        </Flex>
      </Container>
      <Container>
        <ScrollView>
          {(data || Array.from(Array<undefined>(24))).map((movie, index) => (
            <View key={index}>{movie ? <MovieCard movie={movie} /> : <MovieSkeleton />}</View>
          ))}
        </ScrollView>
      </Container>
    </Section>
  )
}
