import { Icon } from '@iconify/react'
import { useTranslation } from 'next-i18next'

import ButtonBase from '@components/ButtonBase'
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@components/Dialog'
import Flex from '@components/Flex'
import IconButton from '@components/IconButton'

import { styled } from 'stitches.config'

const ButtonWrapper = styled('div', {
  position: 'absolute',
  top: '28.125vw',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  '@lg': {
    position: 'relative',
    top: 'auto',
    left: 'auto',
    py: 16,
    transform: 'none',
  },
})

const Button = styled(ButtonBase, {
  height: 40,
  pl: 16,
  pr: 24,
  gap: 4,
  borderRadius: '$pill',
  bg: 'rgba(0, 0, 0, 0.6)',
  color: '#fff',
  fontSize: '0.875rem',
  fontWeight: 500,
  lineHeight: '1.25rem',
})

const StyledClose = styled(DialogClose, {
  position: 'absolute',
  top: 4,
  right: 4,

  '@lg': {
    display: 'none',
  },
})

const Iframe = styled('iframe', {
  border: 0,
  aspectRatio: '16 / 9',

  '@lg': {
    height: 360,
  },

  '@xl': {
    height: 480,
  },

  '@xxl': {
    height: 720,
  },
})

type MovieTrailerProps = {
  trailerId: string
}

export default function MovieDetailsTrailer({ trailerId }: MovieTrailerProps) {
  const { t } = useTranslation('movie-details')

  return (
    <Dialog>
      <ButtonWrapper>
        <DialogTrigger asChild>
          <Button>
            <Icon icon="mdi:play-outline" fontSize={24} />
            {t('trailer')}
          </Button>
        </DialogTrigger>
      </ButtonWrapper>
      <DialogContent css={{ bg: '#000' }}>
        <Flex direction="column" justify="center" css={{ height: '100%' }}>
          <Iframe
            src={`https://www.youtube.com/embed/${trailerId}?autoplay=1&modestbranding=1`}
            allowFullScreen
          />
        </Flex>
        <StyledClose asChild>
          <IconButton size="large" color="light">
            <Icon icon="mdi:close" />
          </IconButton>
        </StyledClose>
      </DialogContent>
    </Dialog>
  )
}
