import jwt, { VerifyOptions, SignOptions } from "jsonwebtoken";

export class JWT {
  static sign<Payload extends Object | string>(
    payload: Payload,
    options?: SignOptions
  ) {
    try {
      const token = jwt.sign(
        payload,
        process.env.JWT_SECRET as string,
        options
      );
      return token;
    } catch {
      return undefined;
    }
  }

  static verify<Payload extends Object | string>(
    token: string,
    options?: VerifyOptions
  ) {
    try {
      const decodedToken = jwt.verify(
        token,
        process.env.JWT_SECRET as string,
        options
      ) as Payload;
      return decodedToken;
    } catch {
      return undefined;
    }
  }
}
