export default function buildImageURL(
  path: string,
  size:
    | 'w45'
    | 'w92'
    | 'w154'
    | 'w185'
    | 'w300'
    | 'w342'
    | 'w500'
    | 'w780'
    | 'w1280'
    | 'h632'
    | 'original' = 'original'
) {
  return `https://image.tmdb.org/t/p/${size}${path}`
}
