import type { NextApiRequest, NextApiResponse } from "next";
import {
  createPostSchema,
  CreatePostSchema,
} from "shared/schemas/create-post-schema";
import { allowedMethods } from "server/helpers/allowed-methods";
import { validateBody } from "server/helpers/validate-body";
import { authUser } from "server/helpers/auth-user";
import { insertPost } from "server/queries/insert-post";

export default async function posts(req: NextApiRequest, res: NextApiResponse) {
  const allowed = allowedMethods(req, res, ["POST"]);
  if (!allowed) {
    return;
  }

  const user = await authUser(req, res);
  if (!user) {
    return;
  }

  const valid = validateBody(req, res, createPostSchema);
  if (!valid) {
    return;
  }

  const payload: CreatePostSchema = req.body;
  const post = await insertPost({
    ...payload,
    userId: user.id as number,
  });

  res.status(200).json({ post });
}
