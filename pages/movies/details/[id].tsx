import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { API_URL, defaultOptions } from '@tmdb/api'
import type { MovieDetails } from '@tmdb/types'

import Container from '@components/Container'
import TitleAndMetaTags from '@components/TitleAndMetaTags'
import { MovieDetailsHero, MovieDetailsRecommendations } from '@components/movie/details'

import MainLayout from '@layouts/MainLayout'

import type { GetStaticPaths, GetStaticProps } from 'next'

type Props = {
  movie: MovieDetails
}

export default function MovieDetailsPage({ movie }: Props) {
  return (
    <>
      <TitleAndMetaTags title={`${movie.title} | Watch`} />
      <MovieDetailsHero movie={movie} />
      <Container gutters css={{ pt: 40 }}>
        <MovieDetailsRecommendations movieId={movie.id} />
      </Container>
    </>
  )
}

MovieDetailsPage.Layout = MainLayout

type Params = {
  id: string
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  return { paths: [], fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params, locale }) => {
  try {
    const res = await fetch(
      `${API_URL}/movie/${
        params!.id
      }?language=${locale}&append_to_response=credits,release_dates,videos`,
      defaultOptions
    )

    if (!res.ok) {
      return { notFound: true }
    }

    const { credits, release_dates, videos, ...other } = await res.json()

    const cast = credits.cast.slice(0, 7)

    const director = credits.crew.find((person: any) => person.job === 'Director') ?? null

    const certification =
      release_dates.results.find((item: any) => item.iso_3166_1 === 'BR')?.release_dates[0]
        ?.certification || null

    const trailer_id =
      videos.results.find(
        (video: any) => video.type === 'Trailer' && video.site === 'YouTube' && video.official
      )?.key ?? null

    const movie = {
      ...other,
      cast,
      certification,
      director,
      trailer_id,
    } as MovieDetails

    return {
      props: {
        ...(await serverSideTranslations(locale ?? 'en', ['common', 'movie-details'])),
        movie,
      },
    }
  } catch (error) {
    console.error(error)
    return { notFound: true }
  }
}
