import { useTranslation } from 'next-i18next'
import Image from 'next/image'

import buildImageURL from '@tmdb/buildImageURL'
import getCertificationColor from '@tmdb/getCertificationColor'
import type { MovieDetails } from '@tmdb/types'

import formatDuration from '@utils/formatDuration'

import Container from '@components/Container'
import Flex from '@components/Flex'
import Text from '@components/Text'

import { styled } from 'stitches.config'

import MovieDetailsTrailer from './MovieDetailsTrailer'

const Root = styled('div', {
  position: 'relative',
  display: 'flex',
  minHeight: '56.25vw',
  pb: 16,
  bg: '#111',
  color: '#fff',

  '@xl': {
    minHeight: 532,
  },

  '@xxl': {
    minHeight: 600,
  },
})

const Cover = styled('div', {
  position: 'absolute',
  top: 0,
  right: 0,
  width: '100vw',
  height: '56.25vw',

  '@xl': {
    width: 947,
    height: 532,
  },

  '@xxl': {
    width: 1067,
    height: 600,
  },

  '& img': {
    objectFit: 'cover',
  },
})

const Gradient = styled('div', {
  position: 'absolute',
  inset: 0,
  backgroundImage: 'linear-gradient(to top, #111 0, rgba(0, 0, 0, 0) 56%)',

  '@lg': {
    backgroundImage:
      'linear-gradient(to right, #111 0, rgba(0, 0, 0, 0) 56%), linear-gradient(to top, #111 0, rgba(0, 0, 0, 0) 56%)',
  },

  '@xl': {
    backgroundImage:
      'linear-gradient(to right, #111 0, rgba(0, 0, 0, 0) 56%), linear-gradient(to top, #111 0, rgba(0, 0, 0, 0) 56%), linear-gradient(to left, #111 0, rgba(0, 0, 0, 0) 56%)',
  },
})

const Header = styled('div', {
  display: 'flex',
  alignItems: 'start',
  mt: 'calc(56.25vw - 48px)',
  mb: 32,

  '@lg': {
    mt: 112,
  },
})

const Poster = styled(Image, {
  display: 'none',

  '@lg': {
    display: 'block',
    mt: 8,
    mr: 24,
    width: 96,
    height: 'auto',
    flexShrink: 0,
    borderRadius: 4,
  },

  '@xl': {
    width: 128,
  },
})

const Title = styled('h1', {
  mt: 0,
  mb: 8,
  fontSize: '1.5rem',
  fontWeight: 500,
  lineHeight: '2rem',

  '@sm': {
    fontSize: '2.25rem',
    lineHeight: '2.75rem',
  },

  '@xl': {
    fontSize: '4rem',
    lineHeight: '4.75rem',
  },
})

const Certification = styled('span', {
  display: 'inline-block',
  mr: 12,
  width: 24,
  height: 24,
  borderRadius: 2,
  fontSize: '0.875rem',
  fontWeight: 500,
  lineHeight: '24px',
  textAlign: 'center',
  verticalAlign: 'middle',
  color: '#fff',

  variants: {
    color: {
      green: {
        bg: '$green',
      },
      blue: {
        bg: '$blue',
      },
      yellow: {
        bg: '$yellow',
      },
      orange: {
        bg: '$orange',
      },
      red: {
        bg: '$red',
      },
      black: {
        bg: '#000',
      },
    },
  },
})

type MovieHeroProps = {
  movie: MovieDetails
}

export default function MovieDetailsHero({ movie }: MovieHeroProps) {
  const { t } = useTranslation('movie-details')

  const {
    id,
    backdrop_path,
    cast,
    certification,
    director,
    genres,
    overview,
    poster_path,
    release_date,
    runtime,
    title,
    trailer_id,
  } = movie

  const facts: string[] = []

  if (release_date) {
    facts.push(release_date.slice(0, 4))
  }

  if (genres.length > 0) {
    facts.push(genres[0].name)
  }

  if (runtime) {
    facts.push(formatDuration(runtime))
  }

  return (
    <Root>
      <Container gutters>
        {backdrop_path ? (
          <Cover>
            <Image
              key={backdrop_path}
              src={buildImageURL(backdrop_path)}
              alt={title}
              priority
              fill
              sizes="(min-width: 1280px) 1200px, 100vw"
            />
            <Gradient />
          </Cover>
        ) : null}
        <Flex direction="column" justify="end" css={{ height: '100%' }}>
          <Flex direction="column" css={{ maxWidth: 720 }}>
            <Header>
              {poster_path ? (
                <Poster
                  key={poster_path}
                  alt={title}
                  src={buildImageURL(poster_path, 'w154')}
                  width={154}
                  height={231}
                />
              ) : null}
              <Flex direction="column">
                <Title>{title}</Title>
                <div>
                  {certification ? (
                    <Certification color={getCertificationColor(certification)}>
                      {certification}
                    </Certification>
                  ) : null}
                  <Text variant="caption" css={{ color: '#aaa' }}>
                    {facts.join(' • ')}
                  </Text>
                </div>
              </Flex>
            </Header>
            {overview ? <Text gutterBottom>{overview}</Text> : null}
            {cast.length > 0 ? (
              <Text gutterBottom>
                <b>{t('starring')}:</b> {cast.map((person) => person.name).join(' • ')}
              </Text>
            ) : null}
            {director ? (
              <Text gutterBottom>
                <b>{t('directed-by')}:</b> {director.name}
              </Text>
            ) : null}
          </Flex>
          {trailer_id ? <MovieDetailsTrailer trailerId={trailer_id} /> : null}
        </Flex>
      </Container>
    </Root>
  )
}
