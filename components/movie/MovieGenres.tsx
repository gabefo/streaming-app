import Image from 'next/image'
import Link from 'next/link'

import Carousel from '@components/Carousel'

import action from 'public/images/genres/action.jpg'
import adventure from 'public/images/genres/adventure.jpg'
import animation from 'public/images/genres/animation.jpg'
import comedy from 'public/images/genres/comedy.jpg'
import crime from 'public/images/genres/crime.jpg'
import documentary from 'public/images/genres/documentary.jpg'
import drama from 'public/images/genres/drama.jpg'
import family from 'public/images/genres/family.jpg'
import fantasy from 'public/images/genres/fantasy.jpg'
import history from 'public/images/genres/history.jpg'
import horror from 'public/images/genres/horror.jpg'
import musical from 'public/images/genres/musical.jpg'
import mystery from 'public/images/genres/mystery.jpg'
import romance from 'public/images/genres/romance.jpg'
import sci_fi from 'public/images/genres/sci-fi.jpg'
import thriller from 'public/images/genres/thriller.jpg'
import tv from 'public/images/genres/tv.jpg'
import war from 'public/images/genres/war.jpg'
import western from 'public/images/genres/western.jpg'
import { styled } from 'stitches.config'

const GENRES = [
  { name: 'Action', image: action, path: '/movies/action' },
  { name: 'Adventure', image: adventure, path: '/movies/adventure' },
  { name: 'Animation', image: animation, path: '/movies/animation' },
  { name: 'Comedy', image: comedy, path: '/movies/comedy' },
  { name: 'Crime', image: crime, path: '/movies/crime' },
  { name: 'Documentary', image: documentary, path: '/movies/documentary' },
  { name: 'Drama', image: drama, path: '/movies/drama' },
  { name: 'Family', image: family, path: '/movies/family' },
  { name: 'Fantasy', image: fantasy, path: '/movies/fantasy' },
  { name: 'History', image: history, path: '/movies/history' },
  { name: 'Horror', image: horror, path: '/movies/horror' },
  { name: 'Musical', image: musical, path: '/movies/musical' },
  { name: 'Mystery', image: mystery, path: '/movies/mystery' },
  { name: 'Romance', image: romance, path: '/movies/romance' },
  { name: 'Sci-fi', image: sci_fi, path: '/movies/sci-fi' },
  { name: 'TV Movie', image: tv, path: '/movies/tv' },
  { name: 'Thriller', image: thriller, path: '/movies/thriller' },
  { name: 'War', image: war, path: '/movies/war' },
  { name: 'Western', image: western, path: '/movies/western' },
]

const Card = styled(Link, {
  position: 'relative',
  aspectRatio: '16 / 9',
  display: 'flex',
  m: 4,
  borderRadius: 8,
  boxShadow: '$1',
  overflow: 'hidden',

  '@sm': {
    m: 8,
  },

  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    bg: '#fff',
    opacity: 0,
    transition: 'opacity 0.2s ease-in-out',
  },

  '@hover': {
    '&:hover::after': {
      opacity: 0.08,
    },
  },

  '&:active::after': {
    opacity: 0.16,
  },
})

const StyledImage = styled(Image, {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
})

const Content = styled('div', {
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'flex-end',
  py: 4,
  px: 8,
  color: '#fff',
  fontSize: '0.875rem',
  lineHeight: '1.125rem',
  backgroundImage: 'linear-gradient(to top, rgba(0, 0, 0, 0.6) 0, transparent 40%)',
})

export default function MovieGenres() {
  return (
    <Carousel
      dots={false}
      infinite={false}
      slidesToShow={8}
      slidesToScroll={8}
      responsive={[
        {
          breakpoint: 1279,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 6,
          },
        },
        {
          breakpoint: 959,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
          },
        },
        {
          breakpoint: 599,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
      ]}
      css={{
        mb: 32,
        mx: -24,

        '& .slick-slider': {
          px: 20,
        },

        '& .slick-list': {
          overflow: 'visible',
        },

        '@xl': {
          '& .slick-slider': {
            px: 16,
          },

          '& .slick-list': {
            overflow: 'hidden',
          },
        },
      }}
    >
      {GENRES.map((genre) => (
        <div key={genre.path}>
          <Card href={genre.path}>
            <StyledImage alt={genre.name} src={genre.image} placeholder="blur" />
            <Content>{genre.name}</Content>
          </Card>
        </div>
      ))}
    </Carousel>
  )
}
