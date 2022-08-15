import type { NextApiRequest, NextApiResponse } from "next";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export function allowedMethods(
  req: NextApiRequest,
  res: NextApiResponse,
  allowedMethods: Method[]
) {
  if (!allowedMethods.includes(req.method as Method)) {
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return false;
  }

  return true;
}
