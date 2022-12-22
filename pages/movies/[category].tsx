import Container from 'components/Container'
import Grid from 'components/Grid'
import MovieCard from 'components/MovieCard'
import MovieSkeleton from 'components/MovieSkeleton'
import Text from 'components/Text'
import TitleAndMetaTags from 'components/TitleAndMetaTags'
import useScrollBottom from 'hooks/useScrollBottom'
import Category from 'interfaces/category'
import Movie from 'interfaces/movie'
import MainLayout from 'layouts/MainLayout'
import categories from 'lib/categories'
import fetcher from 'lib/fetcher'
import { NextPageWithLayout } from 'pages/_app'
import { ReactElement, useEffect } from 'react'
import useSWRInfinite from 'swr/infinite'

const PAGE_SIZE = 24

type Props = {
  category: Category
}

const Movies: NextPageWithLayout<Props> = ({ category }) => {
  const { data, error, size, setSize } = useSWRInfinite<Movie[], Error>(
    (index) => `/api/movies?category=${category.id}&limit=${PAGE_SIZE}&offset=${index * PAGE_SIZE}`,
    fetcher
  )

  const movies = data ? data.flat() : []
  const isLoadingInitialData = !data && !error
  const isLoadingMore =
    isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE)

  const isBottom = useScrollBottom()

  useEffect(() => {
    if (isBottom && !isLoadingMore && !isReachingEnd) {
      setSize((prevSize) => prevSize + 1)
    }
  }, [isLoadingMore, isReachingEnd, setSize, isBottom])

  return (
    <>
      <TitleAndMetaTags />
      <Container gutters>
        <Text as="h6" variant="title" css={{ mb: 16 }}>
          {category.name}
        </Text>
        <Grid
          columns={{
            '@initial': 3,
            '@sm': 4,
            '@md': 6,
            '@lg': 8,
          }}
          css={{ mx: -8, rowGap: 8 }}
        >
          {movies.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
          {isLoadingMore &&
            Array.from(Array(PAGE_SIZE)).map((_, index) => <MovieSkeleton key={index} />)}
        </Grid>
      </Container>
    </>
  )
}

Movies.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}

export default Movies

type Params = {
  params: {
    category: string
  }
}

export async function getStaticProps({ params }: Params) {
  return {
    props: {
      category: categories.find(({ id }) => params.category === id),
    },
  }
}

export async function getStaticPaths() {
  const paths = categories.map(({ id }) => ({
    params: { category: id },
  }))

  return { paths, fallback: false }
}
