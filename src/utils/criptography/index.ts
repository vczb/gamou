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

export const createSessionToken = (userId: string | number) => {
  if (!TOKEN_SECRET) {
    throw new Error("variável TOKEN_SECRET é obrigatória");
  }

  return jwt.sign({ id: userId }, TOKEN_SECRET, {
    expiresIn: TOKEN_EXPIRATION_TIME,
  });
};

export const verifySessionToken = (token: string) => {
  if (!TOKEN_SECRET) {
    throw new Error("variável TOKEN_SECRET é obrigatória");
  }

  const session = jwt.verify(token, TOKEN_SECRET);
  return session;
};

export async function generateHashId(id: string | number) {
  const encoder = new TextEncoder();
  const data = encoder.encode(id.toString());
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
}