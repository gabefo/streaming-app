import { Icon } from '@iconify/react'
import fetcher from 'lib/fetcher'
import type { MovieVideos } from 'lib/tmdb/types'
import { useRouter } from 'next/router'
import { styled } from 'stitches.config'
import useSWRImmutable from 'swr/immutable'
import { Dialog, DialogClose, DialogContent, DialogTrigger } from './Dialog'
import Flex from './Flex'
import IconButton from './IconButton'

const ButtonContainer = styled('div', {
  position: 'absolute',
  top: '28.125vw',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  '@md': {
    position: 'relative',
    top: 'auto',
    left: 'auto',
    py: 16,
    transform: 'none',
  },
})

const Button = styled('button', {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 40,
  pl: 16,
  pr: 24,
  gap: 4,
  borderRadius: '$pill',
  bg: 'rgba(0, 0, 0, 0.6)',
  color: '#fff',
  fontSize: '0.875rem',
  fontWeight: 600,
  lineHeight: '1.25rem',
  cursor: 'pointer',
  zIndex: 1,
})

const StyledClose = styled(DialogClose, {
  position: 'absolute',
  top: 4,
  right: 4,
  zIndex: 1,

  '@md': {
    display: 'none',
  },
})

const Iframe = styled('iframe', {
  border: 0,
  aspectRatio: '16 / 9',

  '@md': {
    height: 360,
  },

  '@lg': {
    height: 480,
  },

  '@xl': {
    height: 720,
  },
})

type MovieTrailerProps = {
  movieId: number
}

export default function MovieTrailer({ movieId }: MovieTrailerProps) {
  const { locale } = useRouter()

  const { data } = useSWRImmutable<MovieVideos, Error>(
    `/api/tmdb/movie/${movieId}/videos?language=${locale}`,
    fetcher
  )

  const trailer = data?.results.find(
    (video) => video.type === 'Trailer' && video.site === 'YouTube' && video.official
  )

  if (!trailer) {
    return null
  }

  return (
    <Dialog>
      <ButtonContainer>
        <DialogTrigger asChild>
          <Button>
            <Icon icon="mdi:play-outline" fontSize={24} />
            Trailer
          </Button>
        </DialogTrigger>
      </ButtonContainer>
      <DialogContent css={{ bg: '#000' }}>
        <StyledClose asChild>
          <IconButton size="large" color="white">
            <Icon icon="mdi:close" />
          </IconButton>
        </StyledClose>
        <Flex direction="column" justify="center" css={{ height: '100%' }}>
          <Iframe
            src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&modestbranding=1`}
            allowFullScreen
          />
        </Flex>
      </DialogContent>
    </Dialog>
  )
}
