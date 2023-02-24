import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'

import Container from '@components/Container'
import TitleAndMetaTags from '@components/TitleAndMetaTags'
import MovieList from '@components/movie/MovieList'

import MainLayout from '@layouts/MainLayout'

import type { GetStaticProps } from 'next'

export default function Page() {
  const { locale } = useRouter()

  return (
    <>
      <TitleAndMetaTags />
      <Container gutters css={{ mt: 24 }}>
        <MovieList
          title="Popular movies"
          getSrc={(index) => `/api/tmdb/movie/popular?language=${locale}&page=${index + 1}`}
        />
      </Container>
    </>
  )
}

Page.Layout = MainLayout

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: { ...(await serverSideTranslations(locale ?? 'en', ['common'])) },
  }
}
