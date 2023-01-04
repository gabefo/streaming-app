import type { Movie } from 'lib/tmdb/types'
import Grid from './Grid'
import MovieCard from './MovieCard'
import MovieSkeleton from './MovieSkeleton'

type MovieListProps = {
  movies?: Movie[]
  loading?: boolean
}

export default function MovieGrid({ movies, loading }: MovieListProps) {
  return (
    <Grid columns={{ '@initial': 1, '@md': 2 }} css={{ mx: -8, rowGap: 8 }}>
      {movies?.map((movie) => (
        <MovieCard key={movie.id} movie={movie} direction="row" />
      ))}
      {loading ? Array.from(Array(20)).map((_, index) => <MovieSkeleton key={index} />) : null}
    </Grid>
  )
}
