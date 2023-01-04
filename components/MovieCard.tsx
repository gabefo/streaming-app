import { Icon } from '@iconify/react'
import type { Movie } from 'lib/tmdb/types'
import buildImageURL from 'lib/tmdb/buildImageURL'
import Image from 'next/image'
import Link from 'next/link'
import { styled } from 'stitches.config'
import type { CSS, VariantProps } from 'stitches.config'
import Text from './Text'

const ImageContainer = styled('div', {
  position: 'relative',
  flexShrink: 0,
  aspectRatio: '3 / 4',
  borderRadius: 8,
  boxShadow: '0 2px 4px 0 rgb(0, 0, 0, 0.2)',
  overflow: 'hidden',

  '& > img': {
    objectFit: 'cover',
  },
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
})

const Description = styled('div', {
  display: 'flex',
  alignItems: 'center',
  mt: 4,
  rowGap: 4,
  columnGap: 12,
})

const Rating = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  color: '$textSecondary',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
})

const Card = styled('a', {
  position: 'relative',
  display: 'flex',
  height: '100%',
  p: 8,
  rowGap: 8,
  columnGap: 16,
  borderRadius: 8,
  color: 'inherit',
  textDecoration: 'none',
  overflow: 'hidden',
  cursor: 'pointer',

  '&:hover': {
    bg: '$hover',
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
          flexDirection: 'column-reverse',
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

type MovieCardProps = VariantProps<typeof Card> & {
  css?: CSS
  movie: Movie
}

export default function MovieCard({ movie, ...props }: MovieCardProps) {
  const { id, title, poster_path, vote_average, release_date } = movie

  return (
    <Link href={`/movies/${id}`} passHref legacyBehavior prefetch={false}>
      <Card {...props}>
        <ImageContainer>
          {poster_path ? (
            <Image
              src={buildImageURL(poster_path)}
              alt={title}
              fill
              sizes="(min-width: 1280px) 122px, (min-width: 960px) 16vw, (min-width: 600px) 25vw, 33vw"
            />
          ) : null}
        </ImageContainer>
        <div>
          <Title>{title}</Title>
          <Description>
            <Rating>
              {(vote_average / 2).toFixed(1)}
              <Icon icon="mdi:star" fontSize={12} />
            </Rating>
            <Text variant="caption" color="secondary">
              {release_date.slice(0, 4)}
            </Text>
          </Description>
        </div>
      </Card>
    </Link>
  )
}
