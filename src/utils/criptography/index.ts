import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import { NotNullOrUndefinedValueError } from "../errors";

const SALT = 12

export const encrypt = async (value: string): Promise<string> => {
  const hash = await bcrypt.hash(value, SALT);
  return hash;
}

export const decrypt = async(userPassword: string, incomingPassword: string)=>{
  return bcrypt.compareSync(
    userPassword,
    incomingPassword
  );
} 

export const createSessionToken = (userId: string) => {
  const secret = process.env.JWT_SECRET

  if(!secret) {
    throw new NotNullOrUndefinedValueError('JWT_SECRET')
  };

  return jwt.sign({ id:  userId}, secret, {
    expiresIn: 86400, // 24 hours
  });
}