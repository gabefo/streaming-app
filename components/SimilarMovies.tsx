import fetcher from 'lib/fetcher'
import type { MovieList } from 'lib/tmdb/types'
import { useRouter } from 'next/router'
import useSWRImmutable from 'swr/immutable'
import MovieGrid from './MovieGrid'

type SimilarMoviesProps = {
  movieId: number
}

export default function SimilarMovies({ movieId }: SimilarMoviesProps) {
  const { locale } = useRouter()

  const { data, error } = useSWRImmutable<MovieList, Error>(
    `/api/tmdb/movie/${movieId}/similar?&language=${locale}`,
    fetcher
  )

  const loading = !data && !error
  const movies = data?.results

  return <MovieGrid movies={movies} loading={loading} />
}
