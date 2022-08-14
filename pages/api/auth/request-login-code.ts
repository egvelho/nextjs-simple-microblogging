import { NextApiRequest, NextApiResponse } from "next";

export default async function requestLoginCode(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    res.status(200).json({});
  }
}
