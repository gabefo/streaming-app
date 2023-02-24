import Box from '@components/Box'
import Skeleton from '@components/Skeleton'

import { CSS, styled, VariantProps } from 'stitches.config'

import MovieCardIndex from './MovieCardIndex'

const Root = styled('div', {
  display: 'flex',
  p: 8,
  rowGap: 8,
  columnGap: 16,

  '@xl': {
    p: 12,
  },

  variants: {
    direction: {
      row: {
        flexDirection: 'row',

        [`& > ${Skeleton}`]: {
          width: 72,
          flexShrink: 0,

          '@sm': {
            width: 96,
          },
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

type MovieSkeletonProps = VariantProps<typeof Root> & { css?: CSS; index?: number }

export default function MovieCardSkeleton({ index, ...props }: MovieSkeletonProps) {
  return (
    <Root {...props}>
      {index !== undefined ? <MovieCardIndex>{index}</MovieCardIndex> : null}
      <Skeleton variant="rounded" css={{ aspectRatio: '2 / 3' }} />
      <Box css={{ flexGrow: 1, minHeight: 64 }}>
        <Skeleton variant="text" />
        <Skeleton variant="text" css={{ width: '60%' }} />
      </Box>
    </Root>
  )
}
