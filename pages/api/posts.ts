import type { NextApiRequest, NextApiResponse } from "next";
import {
  createPostSchema,
  CreatePostSchema,
} from "shared/schemas/create-post-schema";
import { allowedMethods } from "server/handlers/allowed-methods";
import { validateBody } from "server/handlers/validate-body";
import { authUser } from "server/handlers/auth-user";
import { insertPost } from "server/queries/insert-post";

export default async function posts(req: NextApiRequest, res: NextApiResponse) {
  allowedMethods(req, res, ["POST"]);
  const user = await authUser(req, res);
  validateBody(req, res, createPostSchema);

  const payload: CreatePostSchema = req.body;

  const post = await insertPost({
    ...payload,
    userId: user.id as number,
  });

  res.status(200).json({ post });
}
