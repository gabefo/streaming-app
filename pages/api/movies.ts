import movies from 'data/movies'
import Movie from 'interfaces/movie'
import { NextApiRequest, NextApiResponse } from 'next'

type ResponseError = {
  message: string
}

const handler = (req: NextApiRequest, res: NextApiResponse<Movie[] | ResponseError>) => {
  const { query } = req
  const category = query.category as string

  if (!(category in movies)) {
    return res.status(404).json({ message: 'Not found' } as ResponseError)
  }

  const offset = query.offset ? parseInt(query.offset as string) : 0
  const limit = query.limit ? parseInt(query.limit as string) : 24
  const data = movies[category].slice(offset, offset + limit)

  res.status(200).json(data)
}

export default handler
