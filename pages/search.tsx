import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'

import { API_URL, defaultOptions } from '@tmdb/api'

import Container from '@components/Container'
import SearchNotFound from '@components/SearchNotFound'
import TitleAndMetaTags from '@components/TitleAndMetaTags'
import MovieList from '@components/movie/MovieList'

import MainLayout from '@layouts/MainLayout'

import type { GetServerSideProps } from 'next'

type Props = {
  noResults?: boolean
}

export default function SearchPage({ noResults }: Props) {
  const { locale, query } = useRouter()

  const q = query.q as string

  return (
    <>
      <TitleAndMetaTags />
      <Container gutters css={{ mt: 24 }}>
        {noResults ? (
          <SearchNotFound query={q} />
        ) : (
          <MovieList
            title={`Search results for ${q}`}
            getSrc={(index) =>
              `/api/tmdb/search/movie?language=${locale}&query=${q}&page=${index + 1}`
            }
          />
        )}
      </Container>
    </>
  )
}

SearchPage.Layout = MainLayout

export const getServerSideProps: GetServerSideProps<Props> = async ({ query, locale }) => {
  if (!query.q) {
    return {
      notFound: true,
    }
  }

  const response = await fetch(
    `${API_URL}/search/multi?language=${locale}&query=${query.q}`,
    defaultOptions
  )

  const data = await response.json()

  const noResults = data.results.length === 0

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
      noResults,
    },
  }
}
