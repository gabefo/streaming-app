import Movie from 'interfaces/movie'
import Image from 'next/image'
import { styled } from 'stitches.config'

const Card = styled('div', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  p: 8,
  borderRadius: 8,
  cursor: 'pointer',

  '&:hover': {
    bg: '$hover',
  },
})

const ImageContainer = styled('div', {
  position: 'relative',
  pt: '133.3333%',
  borderRadius: 8,
  boxShadow: '0 2px 4px 0 rgb(0, 0, 0, 0.2)',
  overflow: 'hidden',
})

const Content = styled('div', {
  mt: 8,
  minHeight: 40,
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

interface MovieCardProps {
  movie: Movie
}

export default function MovieCard({ movie }: MovieCardProps) {
  const { title, image } = movie

  return (
    <Card>
      <ImageContainer>
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(min-width: 1280px) 122px, (min-width: 960px) 20vw, (min-width: 600px) 25vw, 33vw"
          />
        ) : null}
      </ImageContainer>
      <Content>
        <Title>{title}</Title>
      </Content>
    </Card>
  )
}
