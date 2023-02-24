export interface Data {}

export type ResponseError = {
  status_code: number
  status_message: string
}

export enum MovieGenre {
  ACTION = 28,
  ADVENTURE = 12,
  ANIMATION = 16,
  COMEDY = 35,
  CRIME = 80,
  DOCUMENTARY = 99,
  DRAMA = 18,
  FAMILY = 10751,
  FANTASY = 14,
  HISTORY = 36,
  HORROR = 27,
  MUSIC = 10402,
  MYSTERY = 9648,
  ROMANCE = 10749,
  SCI_FI = 878,
  TV_MOVIE = 10770,
  THRILLER = 53,
  WAR = 10752,
  WESTERN = 37,
}

export enum TVGenre {
  ACTION_AND_ADVENTURE = 10759,
  ANIMATION = 16,
  COMEDY = 35,
  CRIME = 80,
  DOCUMENTARY = 99,
  DRAMA = 18,
  FAMILY = 10751,
  KIDS = 10762,
  MYSTERY = 9648,
  NEWS = 10763,
  REALITY = 10764,
  SCI_FI_AND_FANTASY = 10765,
  SOAP = 10766,
  TALK = 10767,
  WAR_AND_POLITICS = 10768,
  WESTERN = 37,
}

export type Cast = {
  adult: boolean
  cast_id: number
  character: string
  credit_id: string
  gender: Gender | null
  id: number
  known_for_department: string
  name: string
  order: number
  original_name: string
  popularity: number
  profile_path: string | null
}

export type Crew = {
  adult: boolean
  credit_id: string
  department: string
  gender: Gender | null
  id: number
  job: string
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string | null
}

export interface Credits extends Data {
  cast: Cast[]
  crew: Crew[]
  id: number
}

export type Collection = {
  backdrop_path: string | null
  id: number
  name: string
  poster_path: string | null
}

export type Company = {
  id: number
  logo_path: string | null
  name: string
  origin_country: string
}

export type Country = {
  iso_3166_1: string
  name: string
}

export enum Gender {
  UNDEFINED = 0,
  FEMALE = 1,
  MALE = 2,
  NON_BINARY = 3,
}

export type Genre = {
  id: number
  name: string
}

export type Language = {
  english_name: string
  iso_639_1: string
  name: string
}

export type Movie = {
  adult: boolean
  backdrop_path: string | null
  genre_ids: MovieGenre[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string | null
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export type MovieDetails = Omit<Movie, 'genre_ids'> & {
  belongs_to_collection: Collection | null
  budget: number
  cast: Cast[]
  certification: 'L' | '10' | '12' | '14' | '16' | '18' | null
  director: Crew | null
  genres: {
    id: MovieGenre
    name: string
  }[]
  homepage: string | null
  imdb_id: string | null
  production_companies: Company[]
  production_countries: Country[]
  revenue: number
  runtime: number | null
  spoken_languages: Language[]
  status: 'Rumored' | 'Planned' | 'In Production' | 'Post Production' | 'Released' | 'Canceled'
  tagline: string | null
  trailer_id: string | null
}

export type MovieWithMediaType = Movie & { media_type: 'movie' }

export type Network = {
  id: number
  logo_path: string | null
  name: string
  origin_country: string
}

export type Season = {
  air_date: string
  episode_count: number
  id: number
  name: string
  overview: string
  poster_path: string | null
  season_number: number
}

export type TV = {
  backdrop_path: string | null
  first_air_date: string
  genre_ids: TVGenre[]
  id: number
  name: string
  origin_country: string[]
  original_language: string
  original_name: string
  overview: string
  populatiry: number
  poster_path: string | null
  vote_average: number
  vote_count: number
}

export type TVDetails = Omit<TV, 'genre_ids'> & {
  created_by: {
    credit_id: string
    gender: Gender | null
    id: number
    name: string
    profile_path: string | null
  }[]
  episode_run_time: number[]
  genres: {
    id: TVGenre
    name: string
  }[]
  homepage: string
  in_production: boolean
  languages: string[]
  last_air_date: string
  last_episode_to_air: []
  next_episode_to_air: null
  networks: Network[]
  number_of_episodes: number
  number_of_seasons: number
  production_companies: Company[]
  production_countries: Country[]
  seasons: Season[]
  spoken_languages: Language[]
  status: string
  tagline: string
  type: string
}

export type TVWithMediaType = TV & { media_type: 'tv' }

export type Person = {
  adult: boolean
  gender: Gender | null
  id: number
  known_for: (MovieWithMediaType | TVWithMediaType)[]
  known_for_department: string
  name: string
  popularity: number
  profile_path: string | null
}

export type PersonDetails = Omit<Person, 'known_for'> & {
  also_known_as: string[]
  biography: string
  birthday: string | null
  deathday: string | null
  homepage: string | null
  imdb_id: string
  place_of_birth: string | null
}

export type PersonWithMediaType = Person & { media_type: 'person' }

export type Video = {
  id: string
  iso_639_1: string
  iso_3166_1: string
  key: string
  name: string
  official: boolean
  published_at: string
  site: string
  size: number
  type: string
}

export interface List extends Data {
  page: number
  total_pages: number
  total_results: number
}

export interface MovieList extends List {
  results: Movie[]
}

export interface MovieVideos extends Data {
  id: number
  results: Video[]
}

export interface TVList extends List {
  results: TV[]
}

export type SearchMultipleResult = MovieWithMediaType | TVWithMediaType | PersonWithMediaType

export interface SearchMultipleList extends List {
  results: SearchMultipleResult[]
}
