import type { Genre } from './types'

export const API_URL = 'https://api.themoviedb.org/3'

export const defaultOptions = {
  headers: {
    authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
  },
}

export async function getGenreMovieList(language: string = 'en'): Promise<Genre[]> {
  const res = await fetch(`${API_URL}/genre/movie/list?language=${language}`, defaultOptions)

  if (!res.ok) {
    throw new Error(`Fetch to the TMDB API failed with code: ${res.status}`)
  }

  const data = await res.json()

  return data.genres
}
