import MovieSection from 'components/MovieSection'
import Subheader from 'components/Subheader'
import TitleAndMetaTags from 'components/TitleAndMetaTags'
import MainLayout from 'layouts/MainLayout'
import categories from 'lib/categories'
import { ReactElement } from 'react'
import { NextPageWithLayout } from './_app'

const Home: NextPageWithLayout = () => {
  return (
    <>
      <TitleAndMetaTags />
      <Subheader />
      {categories.map((category) => (
        <MovieSection key={category.id} category={category} />
      ))}
    </>
  )
}

Home.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}

export default Home
