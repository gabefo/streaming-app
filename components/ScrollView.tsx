import { Icon } from '@iconify/react'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { styled } from 'stitches.config'

const Root = styled('div', {
  position: 'relative',

  '@lg': {
    px: 'calc($gap - 8px)',
  },
})

const Content = styled('div', {
  position: 'relative',
  display: 'flex',
  px: 'calc($gap - 8px)',
  overflowX: 'auto',
  scrollBehavior: 'smooth',
  scrollSnapType: 'x mandatory',
  scrollPaddingInline: 'calc($gap - 8px)',

  '@lg': {
    px: 0,
    scrollPaddingInline: 0,
  },

  '&::-webkit-scrollbar': {
    display: 'none',
  },
})

const Button = styled('button', {
  position: 'absolute',
  top: 'calc(50% - 44px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 40,
  height: 40,
  p: 0,
  border: 0,
  outline: 0,
  borderRadius: '50%',
  bg: '$background',
  color: '$text',
  fontSize: '1.75rem',
  lineHeight: 1,
  cursor: 'pointer',
  opacity: 0.6,
  transition: 'opacity 0.1s',

  '&:hover': {
    opacity: 0.8,
  },

  '@touch': {
    display: 'none',
  },

  variants: {
    align: {
      left: {
        left: 8,
      },
      right: {
        right: 8,
      },
    },
  },
})

interface ScrollViewProps {
  children?: ReactNode
}

export function ScrollView({ children }: ScrollViewProps) {
  const ref = useRef<HTMLDivElement>(null)

  const [hasContentLeft, setHasContentLeft] = useState(false)

  const [hasContentRight, setHasContentRight] = useState(false)

  useEffect(() => {
    const target = ref.current

    if (!target) {
      return
    }

    const handleScroll = () => {
      const scrollX = Math.ceil(target.scrollLeft)
      setHasContentLeft(scrollX > 0)
      setHasContentRight(scrollX < target.scrollWidth - target.clientWidth)
    }

    handleScroll()

    target.addEventListener('scroll', handleScroll)

    return () => {
      target.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scroll = (direction: number) => {
    const viewport = ref.current
    if (!viewport) {
      return
    }
    const computedStyle = getComputedStyle(viewport)
    const width =
      viewport.clientWidth -
      parseFloat(computedStyle.paddingLeft) -
      parseFloat(computedStyle.paddingRight)
    viewport.scrollBy(width * direction, 0)
  }

  return (
    <Root>
      <Content ref={ref}>{children}</Content>
      {hasContentLeft ? (
        <Button align="left" onClick={() => scroll(-1)}>
          <Icon icon="mdi:chevron-left" />
        </Button>
      ) : null}
      {hasContentRight ? (
        <Button align="right" onClick={() => scroll(1)}>
          <Icon icon="mdi:chevron-right" />
        </Button>
      ) : null}
    </Root>
  )
}

export const View = styled('div', {
  position: 'relative',
  width: '33.3333%',
  flexShrink: 0,
  scrollSnapAlign: 'start',

  '@sm': {
    width: '25%',
  },

  '@md': {
    width: '20%',
  },

  '@lg': {
    width: '12.5%',
  },
})
