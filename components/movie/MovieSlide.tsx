import { useState } from 'react'

import { FastAverageColor } from 'fast-average-color'
import Image from 'next/image'
import Link from 'next/link'
import tinycolor from 'tinycolor2'

import buildImageURL from '@tmdb/buildImageURL'
import { Movie } from '@tmdb/types'

import { CSS, styled } from 'stitches.config'

const fac = new FastAverageColor()

const Root = styled('div', {
  position: 'relative',
  height: 152,

  '@sm': {
    height: 'auto',
    aspectRatio: '4 / 1',
  },
})

const StyledLink = styled(Link, {
  position: 'relative',
  display: 'flex',
  height: '100%',
})

const Cover = styled('div', {
  position: 'absolute',
  top: 0,
  right: 0,
  width: 304,
  height: '100%',

  '@sm': {
    width: '50%',
  },
})

const StyledImage = styled(Image, {
  position: 'relative',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
})

const Gradient = styled('div', {
  position: 'absolute',
  inset: 0,
})

const Content = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  width: '100%',
  p: 24,

  '@sm': {
    width: '50%',
  },
})

const Title = styled('div', {
  position: 'relative',
  maxWidth: 176,
  fontSize: '1.125rem',
  fontWeight: 500,
  lineHeight: '1.5rem',

  '@sm': {
    fontSize: '1.375rem',
    fontWeight: 400,
    lineHeight: '1.75rem',
  },

  '@lg': {
    maxWidth: 480,
    fontSize: '1.5rem',
    lineHeight: '2rem',
  },

  '@xl': {
    fontSize: '1.75rem',
    lineHeight: '2.25rem',
  },
})

const Description = styled('div', {
  mt: 8,
  fontSize: '0.75rem',
  lineHeight: '1rem',

  '@sm': {
    mt: 16,
    fontSize: '1rem',
    lineHeight: '1.5rem',
  },
})

type MovieSlideProps = {
  movie: Movie
}

export default function MovieSlide({ movie }: MovieSlideProps) {
  const [rootCss, setRootCss] = useState<CSS>({ opacity: 0 })
  const [gradientCss, setGradientCss] = useState<CSS>()

  return (
    <Root css={rootCss}>
      <StyledLink href={`/movies/details/${movie.id}`}>
        {movie.backdrop_path ? (
          <Cover>
            <StyledImage
              alt={movie.title}
              src={buildImageURL(movie.backdrop_path, 'w780')}
              width={780}
              height={439}
              priority
              onLoadingComplete={(image) => {
                const backgroundColor = fac.getColor(image, {
                  algorithm: 'dominant',
                  width: image.naturalWidth * 0.3,
                }).hex
                setRootCss({
                  backgroundColor,
                  color: tinycolor(backgroundColor).isLight() ? '#111' : '#fff',
                })
                setGradientCss({
                  backgroundImage: `linear-gradient(to right, ${backgroundColor} 0%, transparent 30%)`,
                })
              }}
            />
            <Gradient css={gradientCss} />
          </Cover>
        ) : null}
        <Content>
          <Title>{movie.title}</Title>
        </Content>
      </StyledLink>
    </Root>
  )
}
