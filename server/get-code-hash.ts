import crypto from "crypto";

export const getCodeHash = (code: string) => {
  return crypto.createHash("sha256").update(code).digest("hex");
};
