import type { NextApiRequest, NextApiResponse } from "next";
import { faker } from "@faker-js/faker";
import {
  createAccountSchema,
  CreateAccountSchema,
} from "shared/schemas/create-account-schema";
import { allowedMethods } from "server/handlers/allowed-methods";
import { validateBody } from "server/handlers/validate-body";
import { jwtAuthToken } from "server/handlers/jwt-auth-token";
import { insertUser } from "server/queries/insert-user";

export default async function createAccount(
  req: NextApiRequest,
  res: NextApiResponse
) {
  allowedMethods(req, res, ["POST"]);
  const email = jwtAuthToken(req, res);
  validateBody(req, res, createAccountSchema);

  const payload: CreateAccountSchema = req.body;

  const user = await insertUser({
    ...payload,
    email,
    avatar: faker.internet.avatar(),
  });

  res.status(200).json({ user });
}
