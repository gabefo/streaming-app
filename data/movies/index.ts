import Movie from 'interfaces/movie'
import { action } from './action'
import { adventure } from './adventure'
import { comedy } from './comedy'
import { disaster } from './disaster'
import { drama } from './drama'
import { fantasy } from './fantasy'
import { horror } from './horror'
import { mystery } from './mystery'
import { newRelease } from './newRelease'
import { oscarWinning } from './oscarWinning'
import { popular } from './popular'
import { superhero } from './superhero'
import { thriller } from './thriller'
import { trending } from './trending'
import { war } from './war'

const movies: { [key: string]: Movie[] } = {
  action,
  adventure,
  comedy,
  disaster,
  drama,
  fantasy,
  horror,
  mystery,
  newRelease,
  oscarWinning,
  popular,
  superhero,
  thriller,
  trending,
  war,
}

export default movies
