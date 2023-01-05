export default function getCertificationColor(certification: string) {
  switch (certification) {
    case 'L':
      return 'green'
    case '10':
      return 'blue'
    case '12':
      return 'yellow'
    case '14':
      return 'orange'
    case '16':
      return 'red'
    case '18':
      return 'black'
    default:
      return undefined
  }
}
