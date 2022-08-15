import type { NextApiRequest, NextApiResponse } from "next";
import { faker } from "@faker-js/faker";
import {
  createAccountSchema,
  CreateAccountSchema,
} from "shared/schemas/create-account-schema";
import { allowedMethods } from "server/helpers/allowed-methods";
import { validateBody } from "server/helpers/validate-body";
import { jwtAuthToken } from "server/helpers/jwt-auth-token";
import { checkUsernameUnique } from "server/queries/check-username-unique";
import { insertUser } from "server/queries/insert-user";

const texts = {
  usernameNotUniqueMessage: "Alguém já está usando esse apelido",
};

export default async function createAccount(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const allowed = allowedMethods(req, res, ["POST"]);
  if (!allowed) {
    return;
  }

  const email = jwtAuthToken(req, res);
  if (!email) {
    return;
  }

  const valid = validateBody(req, res, createAccountSchema);
  if (!valid) {
    return;
  }

  const payload: CreateAccountSchema = req.body;
  const usernameIsUnique = await checkUsernameUnique(payload.username);

  if (usernameIsUnique) {
    const user = await insertUser({
      ...payload,
      email,
      avatar: faker.internet.avatar(),
    });

    res.status(200).json({ user });
  } else {
    res
      .status(200)
      .json({ errors: { username: [texts.usernameNotUniqueMessage] } });
  }
}
