import Container from 'components/Container'
import LoadingIndicator from 'components/LoadingIndicator'
import Text from 'components/Text'
import TitleAndMetaTags from 'components/TitleAndMetaTags'
import useInView from 'hooks/useInView'
import MainLayout from 'layouts/MainLayout'
import fetcher from 'lib/fetcher'
import { getGenreMovieList } from 'lib/tmdb/api'
import type { Genre, MovieList } from 'lib/tmdb/types'
import type { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import type { NextPageWithLayout } from 'pages/_app'
import { createRef, useEffect } from 'react'
import type { ReactElement } from 'react'
import useSWRInfinite from 'swr/infinite'
import MovieGrid from 'components/MovieGrid'

type Props = {
  genre: Genre
}

const Page: NextPageWithLayout<Props> = ({ genre }) => {
  const { locale } = useRouter()

  const { data, error, size, setSize } = useSWRInfinite<MovieList, Error>(
    (index) =>
      `/api/tmdb/discover/movie?language=${locale}&sort_by=popularity.desc&page=${
        index + 1
      }&with_genres=${genre.id}`,
    fetcher
  )

  const movies = data ? data.map(({ results }) => results).flat() : []
  const isLoadingInitialData = !data && !error
  const hasMore = data && data[data.length - 1].total_pages > size + 1

  const ref = createRef<HTMLSpanElement>()

  const isInView = useInView(ref)

  useEffect(() => {
    if (isInView) {
      setSize((prevSize) => prevSize + 1)
    }
  }, [isInView, setSize])

  return (
    <>
      <TitleAndMetaTags />
      <Container gutters css={{ pt: 24 }}>
        <Text as="h6" variant="title" gutterBottom>
          {genre.name}
        </Text>
        <MovieGrid movies={movies} loading={isLoadingInitialData} />
        {hasMore && <LoadingIndicator ref={ref} />}
      </Container>
    </>
  )
}

Page.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}

export default Page

type Params = {
  id: string
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params, locale }) => {
  const genres = await getGenreMovieList(locale)
  const genre = genres.find(({ id }) => parseInt(params!.id) === id) as Genre

  return {
    props: { ...(await serverSideTranslations(locale ?? 'en', ['common'])), genre },
  }
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: 'blocking',
    }
  }

  const genres = await getGenreMovieList()

  const paths = genres.flatMap((genre) =>
    (locales as string[]).map((locale) => ({
      params: { id: genre.id.toString() },
      locale,
    }))
  )

  return { paths, fallback: false }
}
