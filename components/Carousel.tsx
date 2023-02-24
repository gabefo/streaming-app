import React from 'react'

import { Icon } from '@iconify/react'
import Slider from 'react-slick'

import { CSS, styled } from 'stitches.config'

import Fab from './Fab'

const Root = styled('div', {
  position: 'relative',
})

const Dots = styled('ul', {
  position: 'absolute',
  bottom: 8,
  left: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  m: 0,
  p: 0,
  listStyle: 'none',
  transform: 'translateX(-50%)',
  zIndex: 1,
})

const Dot = styled('div', {
  display: 'inline-flex',
  p: 4,
  opacity: 0.4,
  cursor: 'pointer',
  transition: 'opacity 0.1s',

  '&::before': {
    content: '""',
    width: 8,
    height: 8,
    borderRadius: '50%',
    bg: '#fff',
  },

  '&:hover': {
    opacity: 0.6,
  },

  '.slick-active &': {
    opacity: 0.8,
  },
})

const ArrowWrapper = styled('div', {
  display: 'none',
  position: 'absolute',
  transform: 'translateY(-50%)',
  zIndex: 1,

  '@hover': {
    '.slick-slider:hover &': {
      display: 'block',
    },
  },
})

type ArrowProps = {
  className?: string
  offset?: number
  onClick?: (event: any) => any
}

function NextArrow({ className, offset = 0, onClick }: ArrowProps) {
  if (className?.includes('slick-disabled')) {
    return null
  }

  return (
    <ArrowWrapper css={{ top: offset ? `calc(50% + ${offset}px)` : '50%', right: 8 }}>
      <Fab onClick={onClick}>
        <Icon icon="mdi:chevron-right" />
      </Fab>
    </ArrowWrapper>
  )
}

function PrevArrow({ className, offset = 0, onClick }: ArrowProps) {
  if (className?.includes('slick-disabled')) {
    return null
  }

  return (
    <ArrowWrapper css={{ top: offset ? `calc(50% + ${offset}px)` : '50%', left: 8 }}>
      <Fab onClick={onClick}>
        <Icon icon="mdi:chevron-left" />
      </Fab>
    </ArrowWrapper>
  )
}

type CarouselProps = React.ComponentProps<typeof Slider> & { css?: CSS; arrowOffset?: number }

const Carousel = React.forwardRef<React.ElementRef<typeof Slider>, CarouselProps>(
  ({ children, css, arrowOffset, ...props }, forwardedRef) => (
    <Root css={css}>
      <Slider
        speed={300}
        easing="ease-in-out"
        swipeToSlide
        draggable={false}
        dotsClass=""
        appendDots={(dots) => <Dots>{dots}</Dots>}
        customPaging={() => <Dot />}
        nextArrow={<NextArrow offset={arrowOffset} />}
        prevArrow={<PrevArrow offset={arrowOffset} />}
        {...props}
        ref={forwardedRef}
      >
        {children}
      </Slider>
    </Root>
  )
)

export default Carousel
