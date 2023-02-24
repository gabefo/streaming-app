import { stringify } from 'querystring'

import { API_URL, defaultOptions } from '@tmdb/api'
import type { Data, ResponseError } from '@tmdb/types'

import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse<Data | ResponseError>) => {
  const { method, query } = req

  const { slug, ...params } = query

  const pathname = (slug as string[]).join('/')

  try {
    const response = await fetch(`${API_URL}/${pathname}?${stringify(params)}`, {
      ...defaultOptions,
      method: method || 'GET',
    })

    const data = await response.json()

    if (response.ok) {
      // Cache the TMDB response for 24 hours
      res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate')
      res.status(200).json(data)
    } else {
      res.status(response.status).json(data)
    }
  } catch (error) {
    res
      .status(500)
      .json({ status_code: 500, status_message: 'Internal Server Error' } as ResponseError)
  }
}

export default handler
