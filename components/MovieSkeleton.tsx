import Box from './Box'
import Skeleton from './Skeleton'

export default function MovieSkeleton() {
  return (
    <Box css={{ p: 8 }}>
      <Skeleton variant="rounded" css={{ pt: '133.3333%' }} />
      <Skeleton variant="text" css={{ mt: 8 }} />
      <Skeleton variant="text" css={{ width: '60%' }} />
    </Box>
  )
}
