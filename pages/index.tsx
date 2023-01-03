import MovieSection from 'components/MovieSection'
import Subheader from 'components/Subheader'
import TitleAndMetaTags from 'components/TitleAndMetaTags'
import MainLayout from 'layouts/MainLayout'
import { getGenreMovieList } from 'lib/tmdb/api'
import type { Genre } from 'lib/tmdb/types'
import type { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type { ReactElement } from 'react'
import type { NextPageWithLayout } from './_app'

type Props = {
  genres: Genre[]
}

const Page: NextPageWithLayout<Props> = ({ genres }) => {
  return (
    <>
      <TitleAndMetaTags />
      <Subheader />
      {genres.map((genre) => (
        <MovieSection key={genre.id} genre={genre} />
      ))}
    </>
  )
}

Page.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}

export default Page

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  const genres = await getGenreMovieList(locale)

  return {
    props: { ...(await serverSideTranslations(locale ?? 'en', ['common'])), genres },
  }
}
