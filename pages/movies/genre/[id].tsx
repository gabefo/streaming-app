import Container from 'components/Container'
import Text from 'components/Text'
import TitleAndMetaTags from 'components/TitleAndMetaTags'
import MainLayout from 'layouts/MainLayout'
import fetcher from 'lib/fetcher'
import { getGenreMovieList } from 'lib/tmdb/api'
import type { Genre, MovieList } from 'lib/tmdb/types'
import type { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import type { NextPageWithLayout } from 'pages/_app'
import { ReactElement, useCallback } from 'react'
import useSWRInfinite from 'swr/infinite'
import MovieGrid from 'components/MovieGrid'
import LoadMore from 'components/LoadMore'

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

  const movies = data ? data.flatMap(({ results }) => results) : []
  const isLoadingInitialData = !data && !error
  const hasMore = data && data[data.length - 1].total_pages > size + 1

  const handleLoadMore = useCallback(() => {
    setSize((prevSize) => prevSize + 1)
  }, [setSize])

  return (
    <>
      <TitleAndMetaTags />
      <Container gutters css={{ pt: 24 }}>
        <Text as="h6" variant="title" gutterBottom>
          {genre.name}
        </Text>
        <MovieGrid movies={movies} loading={isLoadingInitialData} />
        {hasMore && <LoadMore onLoadMore={handleLoadMore} />}
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

export const getStaticPaths: GetStaticPaths<Params> = async ({ locales }) => {
  const genres = await getGenreMovieList()

  return {
    paths: locales
      ? locales.flatMap((locale) =>
          genres.map((genre) => ({
            params: { id: genre.id.toString() },
            locale,
          }))
        )
      : genres.map((genre) => ({
          params: {
            id: genre.id.toString(),
          },
        })),
    fallback: false,
  }
}
