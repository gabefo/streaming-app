import MovieSection from 'components/MovieSection'
import TitleAndMetaTags from 'components/TitleAndMetaTags'
import MainLayout from 'layouts/MainLayout'
import { ReactElement } from 'react'
import { NextPageWithLayout } from './_app'

const Home: NextPageWithLayout = () => {
  return (
    <>
      <TitleAndMetaTags />
      <MovieSection title="Popular movies" genre="popular" />
      <MovieSection title="New Releases" genre="newRelease" />
      <MovieSection title="Adventure movies" genre="adventure" />
      <MovieSection title="Oscar-winning movies" genre="oscarWinning" />
      <MovieSection title="Drama movies" genre="drama" />
      <MovieSection title="Action movies" genre="action" />
      <MovieSection title="Fantasy movies" genre="fantasy" />
      <MovieSection title="Thriller movies" genre="thriller" />
      <MovieSection title="Mystery movies" genre="mystery" />
      <MovieSection title="Horror movies" genre="horror" />
      <MovieSection title="Comedy movies" genre="comedy" />
      <MovieSection title="Superhero movies" genre="superhero" />
    </>
  )
}

Home.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}

export default Home
