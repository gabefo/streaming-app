export const API_URL = 'https://api.themoviedb.org/3'

export const defaultOptions = {
  headers: {
    authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
  },
}
