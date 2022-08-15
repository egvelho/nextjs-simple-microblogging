import type { NextApiRequest, NextApiResponse } from "next";
import { JWT } from "server/jwt";

export function jwtAuthToken(req: NextApiRequest, res: NextApiResponse) {
  const decodedToken = JWT.verify(
    (req.headers["authorization"] || "").split("Bearer ")[1]
  );

  if (decodedToken === undefined) {
    res.status(401).end(`Unauthorized`);
    return undefined;
  }

  return decodedToken as string;
}
