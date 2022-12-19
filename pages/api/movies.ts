import movies from 'data/movies'
import Movie from 'interfaces/movie'
import { NextApiRequest, NextApiResponse } from 'next'

type ResponseError = {
  message: string
}

const handler = (req: NextApiRequest, res: NextApiResponse<Movie[] | ResponseError>) => {
  const { query } = req
  const genre = query.genre as string

  if (!(genre in movies)) {
    return res.status(404).json({ message: 'Not found' } as ResponseError)
  }

  const data = movies[genre]

  res.status(200).json(data)
}

export default handler
