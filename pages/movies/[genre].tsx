import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'

import { MovieGenre } from '@tmdb/types'

import Container from '@components/Container'
import TitleAndMetaTags from '@components/TitleAndMetaTags'
import MovieList from '@components/movie/MovieList'

import MainLayout from '@layouts/MainLayout'

import type { GetStaticPaths, GetStaticProps } from 'next'

const GENRE_PATHS = [
  { slug: 'action', title: 'Action movies', genreId: MovieGenre.ACTION },
  { slug: 'adventure', title: 'Adventure movies', genreId: MovieGenre.ADVENTURE },
  { slug: 'animation', title: 'Animation movies', genreId: MovieGenre.ANIMATION },
  { slug: 'comedy', title: 'Comedy movies', genreId: MovieGenre.COMEDY },
  { slug: 'crime', title: 'Crime movies', genreId: MovieGenre.CRIME },
  { slug: 'documentary', title: 'Documentary movies', genreId: MovieGenre.DOCUMENTARY },
  { slug: 'drama', title: 'Drama movies', genreId: MovieGenre.DRAMA },
  { slug: 'family', title: 'Family movies', genreId: MovieGenre.FAMILY },
  { slug: 'fantasy', title: 'Fantasy movies', genreId: MovieGenre.FANTASY },
  { slug: 'history', title: 'History movies', genreId: MovieGenre.HISTORY },
  { slug: 'horror', title: 'Horror movies', genreId: MovieGenre.HORROR },
  { slug: 'musical', title: 'Music movies', genreId: MovieGenre.MUSIC },
  { slug: 'mystery', title: 'Mystery movies', genreId: MovieGenre.MYSTERY },
  { slug: 'romance', title: 'Romance movies', genreId: MovieGenre.ROMANCE },
  { slug: 'sci-fi', title: 'Sci-fi movies', genreId: MovieGenre.SCI_FI },
  { slug: 'tv', title: 'TV movies', genreId: MovieGenre.TV_MOVIE },
  { slug: 'thriller', title: 'Thriller movies', genreId: MovieGenre.THRILLER },
  { slug: 'war', title: 'War movies', genreId: MovieGenre.WAR },
  { slug: 'western', title: 'Western movies', genreId: MovieGenre.WESTERN },
]

type Props = {
  title: string
  genreId: MovieGenre
}

export default function Page({ title, genreId }: Props) {
  const { locale } = useRouter()

  return (
    <>
      <TitleAndMetaTags title={`${title} | Watch`} />
      <Container gutters css={{ mt: 24 }}>
        <MovieList
          title={title}
          getSrc={(index) =>
            `/api/tmdb/discover/movie?language=${locale}&page=${index + 1}&with_genres=${genreId}`
          }
        />
      </Container>
    </>
  )
}

Page.Layout = MainLayout

type Params = {
  genre: string
}

export const getStaticPaths: GetStaticPaths<Params> = async ({ locales }) => {
  return {
    paths: locales
      ? locales.flatMap((locale) =>
          GENRE_PATHS.map(({ slug }) => ({
            params: { genre: slug },
            locale,
          }))
        )
      : GENRE_PATHS.map(({ slug }) => ({
          params: { genre: slug },
        })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params, locale }) => {
  const { title, genreId } = GENRE_PATHS.find(({ slug }) => params!.genre === slug)!

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
      title,
      genreId,
    },
  }
}
