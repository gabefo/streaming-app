import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'

import Container from '@components/Container'
import TitleAndMetaTags from '@components/TitleAndMetaTags'
import MovieList from '@components/movie/MovieList'

import MainLayout from '@layouts/MainLayout'

import type { GetStaticProps } from 'next'

export default function Page() {
  const {
    locale,
    query: { q },
  } = useRouter()

  return (
    <>
      <TitleAndMetaTags />
      <Container gutters css={{ mt: 24 }}>
        {q ? (
          <MovieList
            title={`Search results for ${q}`}
            getSrc={(index) =>
              `/api/tmdb/search/movie?language=${locale}&query=${q}&page=${index + 1}`
            }
          />
        ) : null}
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
