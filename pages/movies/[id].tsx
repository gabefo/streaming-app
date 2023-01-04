import Container from 'components/Container'
import MovieHero from 'components/MovieHero'
import SimilarMovies from 'components/SimilarMovies'
import Text from 'components/Text'
import TitleAndMetaTags from 'components/TitleAndMetaTags'
import MainLayout from 'layouts/MainLayout'
import { API_URL, defaultOptions } from 'lib/tmdb/api'
import type { MovieDetails } from 'lib/tmdb/types'
import type { GetStaticPaths, GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type { NextPageWithLayout } from 'pages/_app'
import type { ReactElement } from 'react'

type Props = {
  movie: MovieDetails
}

const Page: NextPageWithLayout<Props> = ({ movie }) => {
  const { t } = useTranslation()

  return (
    <>
      <TitleAndMetaTags title={`${movie.title} | Watch`} />
      <MovieHero movie={movie} />
      <Container gutters css={{ pt: 40 }}>
        <Text as="h6" variant="title" gutterBottom>
          {t('similar-movies')}
        </Text>
        <SimilarMovies movieId={movie.id} />
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
  try {
    const res = await fetch(
      `${API_URL}/movie/${params!.id}?language=${locale}&append_to_response=credits,release_dates`,
      defaultOptions
    )

    if (!res.ok) {
      return { notFound: true }
    }

    const { release_dates, credits, ...other } = await res.json()

    const certification =
      release_dates.results.find((item: any) => item.iso_3166_1 === 'BR')?.release_dates[0]
        ?.certification || null

    const cast = credits.cast.slice(0, 7)

    const director = credits.crew.find((person: any) => person.job === 'Director') ?? null

    const movie = {
      ...other,
      certification,
      cast,
      director,
    } as MovieDetails

    return {
      props: { ...(await serverSideTranslations(locale ?? 'en', ['common'])), movie },
    }
  } catch (error) {
    console.error(error)
    return { notFound: true }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: true }
}
