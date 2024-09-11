import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { TOKEN_EXPIRATION_TIME, TOKEN_SECRET } from "../constants";

const SALT = 12;

export const encrypt = async (value: string): Promise<string> => {
  const hash = await bcrypt.hash(value, SALT);
  return hash;
};

export const decrypt = async (value1: string, value2: string) => {
  return bcrypt.compareSync(value1, value2);
};

export const createSessionToken = (userId: string) => {
  if (!TOKEN_SECRET) {
    throw new Error("variável TOKEN_SECRET é obrigatória");
  }

  return jwt.sign({ id: userId }, TOKEN_SECRET, {
    expiresIn: TOKEN_EXPIRATION_TIME,
  });
};

export const verifySeesionToken = (token: string) => {
  if (!TOKEN_SECRET) {
    throw new Error("variável TOKEN_SECRET é obrigatória");
  }

  jwt.verify(token, TOKEN_SECRET);
};

