import { CSS, styled, VariantProps } from 'stitches.config'
import Box from './Box'
import Skeleton from './Skeleton'

const Root = styled('div', {
  display: 'grid',
  p: 8,
  rowGap: 8,
  columnGap: 16,

  variants: {
    direction: {
      row: {
        gridTemplateColumns: '72px auto',

        '@sm': {
          gridTemplateColumns: '96px minmax(auto, 40%)',
        },
      },
      column: {
        gridTemplateRows: 'auto auto',
      },
    },
  },

  defaultVariants: {
    direction: 'column',
  },
})

type MovieSkeletonProps = VariantProps<typeof Root> & { css?: CSS }

export default function MovieSkeleton(props: MovieSkeletonProps) {
  return (
    <Root {...props}>
      <Skeleton variant="rounded" css={{ aspectRatio: '3 / 4' }} />
      <Box css={{ minHeight: 64 }}>
        <Skeleton variant="text" />
        <Skeleton variant="text" css={{ width: '60%' }} />
      </Box>
    </Root>
  )
}
