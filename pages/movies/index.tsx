import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'

import getCountryCode from '@utils/getCountryCode'

import Container from '@components/Container'
import TitleAndMetaTags from '@components/TitleAndMetaTags'
import MovieCarousel from '@components/movie/MovieCarousel'
import MovieGenres from '@components/movie/MovieGenres'
import MovieTopRated from '@components/movie/MovieTopRated'
import MovieTrending from '@components/movie/MovieTrending'

import MainLayout from '@layouts/MainLayout'

import type { GetStaticProps } from 'next'

export default function HomePage() {
  const { locale } = useRouter()

  const region = getCountryCode()

  return (
    <>
      <TitleAndMetaTags />
      <Container gutters css={{ mt: 24 }}>
        <MovieGenres />
        <MovieTrending />
        <MovieCarousel
          title="Popular movies"
          src={`/api/tmdb/movie/popular?language=${locale}`}
          path="/movies/popular"
        />
        <MovieTopRated />
        <MovieCarousel
          title="Now playing"
          src={`/api/tmdb/movie/now_playing?language=${locale}&region=${region}`}
          path="/movies/now-playing"
        />
        <MovieCarousel
          title="Upcoming movies"
          src={`/api/tmdb/movie/upcoming?language=${locale}`}
          path="/movies/upcoming"
        />
        <MovieCarousel
          title="Netflix"
          src={`/api/tmdb/discover/movie?language=${locale}&with_watch_providers=8&watch_region=${region}`}
          path="/movies/netflix"
        />
        <MovieCarousel
          title="Disney+"
          src={`/api/tmdb/discover/movie?language=${locale}&with_watch_providers=337&watch_region=${region}`}
          path="/movies/disney-plus"
        />
        <MovieCarousel
          title="Prime Video"
          src={`/api/tmdb/discover/movie?language=${locale}&with_watch_providers=119&watch_region=${region}`}
          path="/movies/prime-video"
        />
      </Container>
    </>
  )
}

HomePage.Layout = MainLayout

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: { ...(await serverSideTranslations(locale ?? 'en', ['common'])) },
  }
}
