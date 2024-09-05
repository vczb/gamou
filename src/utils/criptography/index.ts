import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NotNullOrUndefinedValueError } from "../errors";
import { TOKEN_SECRET } from "../constants";

const SALT = 12;

export const encrypt = async (value: string): Promise<string> => {
  const hash = await bcrypt.hash(value, SALT);
  return hash;
};

export const decrypt = async (
  value1: string,
  value2: string
) => {
  return bcrypt.compareSync(value1, value2);
};

export const createSessionToken = (userId: string) => {
  if (!TOKEN_SECRET) {
    throw new NotNullOrUndefinedValueError("TOKEN_SECRET");
  }

  return jwt.sign({ id: userId }, TOKEN_SECRET, {
    expiresIn: 86400, // 24 hours
  });
};

