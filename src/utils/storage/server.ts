import { cookies } from "next/headers";
import { STORAGE_KEY, TOKEN_EXPIRATION_TIME } from "../constants";

export const setCookies = (key: string, value: string) => {

  cookies().set(`${STORAGE_KEY}_${key}`, value, {
    maxAge: TOKEN_EXPIRATION_TIME, 
    secure: process.env.NODE_ENV === 'production',
    path: "/", 
  });
};
