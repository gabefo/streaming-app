import type { MovieDetails } from 'lib/tmdb/types'
import buildImageURL from 'lib/tmdb/buildImageURL'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { styled } from 'stitches.config'
import Container from './Container'
import Flex from './Flex'
import Text from './Text'
import formatDuration from 'lib/formatDuration'

const Root = styled('div', {
  position: 'relative',
  display: 'flex',
  minHeight: '56.25vw',
  bg: '#111',
  color: '#fff',

  '@lg': {
    minHeight: 532,
  },

  '@xl': {
    minHeight: 600,
  },
})

const Cover = styled('div', {
  position: 'absolute',
  top: 0,
  right: 0,
  width: '100vw',
  height: '56.25vw',

  '@lg': {
    width: 947,
    height: 532,
  },

  '@xl': {
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

  '@md': {
    backgroundImage:
      'linear-gradient(to right, #111 0, rgba(0, 0, 0, 0) 56%), linear-gradient(to top, #111 0, rgba(0, 0, 0, 0) 56%)',
  },

  '@lg': {
    backgroundImage:
      'linear-gradient(to right, #111 0, rgba(0, 0, 0, 0) 56%), linear-gradient(to top, #111 0, rgba(0, 0, 0, 0) 56%), linear-gradient(to left, #111 0, rgba(0, 0, 0, 0) 56%)',
  },
})

const Content = styled('div', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  maxWidth: 720,
  height: '100%',
  pb: 16,
})

const Header = styled('div', {
  display: 'flex',
  alignItems: 'start',
  mt: 'calc(56.25vw - 48px)',
  mb: 32,

  '@md': {
    mt: 112,
  },
})

const Poster = styled(Image, {
  display: 'none',

  '@md': {
    display: 'block',
    mt: 8,
    mr: 24,
    width: 96,
    height: 'auto',
    flexShrink: 0,
    borderRadius: 4,
  },

  '@lg': {
    width: 128,
  },
})

const Title = styled('h1', {
  mt: 0,
  mb: 8,
  fontSize: '1.5rem',
  fontWeight: 600,
  lineHeight: '2rem',

  '@sm': {
    fontSize: '2.25rem',
    lineHeight: '2.75rem',
  },

  '@lg': {
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
  fontWeight: 600,
  lineHeight: '24px',
  textAlign: 'center',
  verticalAlign: 'middle',
  color: '#fff',

  variants: {
    variant: {
      L: {
        bg: '$green',
        '&::before': {
          content: 'L',
        },
      },
      10: {
        bg: '$blue',
        '&::before': {
          content: '10',
        },
      },
      12: {
        bg: '$yellow',
        '&::before': {
          content: '12',
        },
      },
      14: {
        bg: '$orange',
        '&::before': {
          content: '14',
        },
      },
      16: {
        bg: '$red',
        '&::before': {
          content: '16',
        },
      },
      18: {
        bg: '#000',
        '&::before': {
          content: '18',
        },
      },
    },
  },
})

type MovieHeroProps = {
  movie: MovieDetails
}

export default function MovieHero({ movie }: MovieHeroProps) {
  const { t } = useTranslation('common')

  const {
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
        {backdrop_path && (
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
        )}
        <Content>
          <Header>
            {poster_path && (
              <Poster
                key={poster_path}
                alt={title}
                src={buildImageURL(poster_path, 'w154')}
                width={154}
                height={231}
              />
            )}
            <Flex direction="column">
              <Title>{title}</Title>
              <div>
                {certification && <Certification variant={certification} />}
                <Text variant="caption" css={{ color: '#aaa' }}>
                  {facts.join(' • ')}
                </Text>
              </div>
            </Flex>
          </Header>
          {overview ? <Text gutterBottom>{overview}</Text> : null}
          {cast.length > 0 ? (
            <Text gutterBottom>
              <b>{t('starring')}</b> {cast.map((person) => person.name).join(' • ')}
            </Text>
          ) : null}
          {director && (
            <Text gutterBottom>
              <b>{t('directed-by')}</b> {director.name}
            </Text>
          )}
        </Content>
      </Container>
    </Root>
  )
}
