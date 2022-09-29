import { prisma } from './../../server/db/client';
import { NextApiRequest, NextApiResponse } from "next";
import { readSync } from 'fs';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const slug = req.query["slug"];

  if (!slug || typeof slug !== "string") {
    res.statusCode = 404
    res.send(JSON.stringify({message: "Please enter a valid string."}))
    return;
  }

  const data = await prisma.shortLink.findFirst({
    where: {
      slug: {
        equals: slug
      }
    }
  })

  if (!data) {
    res.statusCode = 404

    res.send(JSON.stringify({message: "Shortened link not found."}))
    return;
  }

  return res.redirect(data.url)
}