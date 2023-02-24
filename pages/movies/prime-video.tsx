import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'

import getCountryCode from '@utils/getCountryCode'

import Container from '@components/Container'
import TitleAndMetaTags from '@components/TitleAndMetaTags'
import MovieList from '@components/movie/MovieList'

import MainLayout from '@layouts/MainLayout'

import type { GetStaticProps } from 'next'

export default function Page() {
  const { locale } = useRouter()

  const region = getCountryCode()

  return (
    <>
      <TitleAndMetaTags />
      <Container gutters css={{ mt: 24 }}>
        <MovieList
          title="Prime Video"
          getSrc={(index) =>
            `/api/tmdb/discover/movie?language=${locale}&with_watch_providers=119&watch_region=${region}&page=${
              index + 1
            }`
          }
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
