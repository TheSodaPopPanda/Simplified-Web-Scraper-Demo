import type { NextApiRequest, NextApiResponse } from 'next'
import { scrapeData } from '../../lib/scrapeSite'

export default async function handler (req:NextApiRequest, res:NextApiResponse) {
  const { site } = req.query
  const data = await scrapeData('' + site, {})
  res.send(data)
}
