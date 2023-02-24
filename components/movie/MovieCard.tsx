import { Icon } from '@iconify/react'
import Image from 'next/image'
import Link from 'next/link'

import buildImageURL from '@tmdb/buildImageURL'
import type { Movie } from '@tmdb/types'

import toDataURL from '@utils/toDataURL'

import Flex from '@components/Flex'

import { darkTheme, styled } from 'stitches.config'

import MovieCardIndex from './MovieCardIndex'

import type { CSS, VariantProps } from 'stitches.config'

const placeholder = (fill: string) =>
  toDataURL(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <path fill="${fill}" d="M27.5,5H4.5A1.50008,1.50008,0,0,0,3,6.5v19A1.50008,1.50008,0,0,0,4.5,27h23A1.50008,1.50008,0,0,0,29,25.5V6.5A1.50008,1.50008,0,0,0,27.5,5ZM26,18.5l-4.79425-5.2301a.99383.99383,0,0,0-1.44428-.03137l-5.34741,5.34741L19.82812,24H17l-4.79291-4.793a1.00022,1.00022,0,0,0-1.41418,0L6,24V8H26Zm-17.9-6a2.4,2.4,0,1,1,2.4,2.4A2.40005,2.40005,0,0,1,8.1,12.5Z"/>
</svg>
`)

const ImageContainer = styled('div', {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
  aspectRatio: '2 / 3',
  borderRadius: 8,
  bg: '$neutral',
  backgroundImage: placeholder('#c1c1c1'),
  backgroundPosition: 'center',
  backgroundSize: '50%',
  backgroundRepeat: 'no-repeat',
  boxShadow: '$1',
  overflow: 'hidden',

  [`.${darkTheme} &`]: {
    backgroundImage: placeholder('#686868'),
  },

  '& > img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
})

const Content = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  minHeight: 64,
  gap: 4,
})

const Title = styled('div', {
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  fontSize: '0.875rem',
  fontWeight: 400,
  lineHeight: '1.25rem',
  overflow: 'hidden',
  textOverflow: 'ellipsis',

  '@sm': {
    fontSize: '1rem',
    lineHeight: '1.5rem',
  },
})

const Description = styled('div', {
  display: 'flex',
  alignItems: 'center',
  rowGap: 4,
  columnGap: 12,
  color: '$textSecondary',
  fontSize: '0.875rem',
  fontWeight: 400,
  lineHeight: '1.25rem',
})

const Root = styled(Link, {
  position: 'relative',
  display: 'flex',
  p: 8,
  rowGap: 8,
  columnGap: 16,
  borderRadius: 8,
  overflow: 'hidden',
  cursor: 'pointer',
  userSelect: 'none',
  transition: 'background-color 0.2s ease-in-out',

  '@xl': {
    p: 12,
  },

  '@hover': {
    '&:hover': {
      bg: '$hover',
    },
  },

  '&:active': {
    bg: '$active',
  },

  variants: {
    direction: {
      row: {
        flexDirection: 'row',

        [`& ${ImageContainer}`]: {
          width: 72,

          '@sm': {
            width: 96,
          },
        },

        [`& ${Description}`]: {
          flexDirection: 'column',
          alignItems: 'flex-start',
        },
      },
      column: {
        flexDirection: 'column',
      },
    },
  },

  defaultVariants: {
    direction: 'column',
  },
})

type MovieCardProps = VariantProps<typeof Root> & {
  css?: CSS
  movie: Movie
  index?: number
}

export default function MovieCard({ movie, index, ...props }: MovieCardProps) {
  const { id, title, poster_path, vote_count, vote_average, release_date } = movie

  return (
    <Root href={`/movies/details/${id}`} prefetch={false} {...props}>
      {index !== undefined ? <MovieCardIndex>{index}</MovieCardIndex> : null}
      <ImageContainer>
        {poster_path ? (
          <Image alt={title} src={buildImageURL(poster_path, 'w342')} width={342} height={513} />
        ) : null}
      </ImageContainer>
      <Content>
        <Title>{title}</Title>
        <Description>
          {release_date ? release_date.slice(0, 4) : null}
          {vote_count > 0 ? (
            <Flex align="center" css={{ gap: 4 }}>
              {(vote_average / 2).toFixed(1)}
              <Icon icon="mdi:star" fontSize={12} />
            </Flex>
          ) : null}
        </Description>
      </Content>
    </Root>
  )
}
