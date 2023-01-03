export default function formatDuration(duration: number) {
  if (duration < 60) {
    return `${duration} min`
  }
  const hours = Math.floor(duration / 60)
  const minutes = duration % 60
  return minutes > 0 ? `${hours} hr ${minutes} min` : `${hours} hr`
}
