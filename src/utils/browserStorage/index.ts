import { cookies } from "next/headers";
import { STORAGE_KEY, TOKEN_EXPIRATION_TIME } from "../constants";

export function getStorageItem(key: string) {
  if (typeof window === "undefined") return;

  const data = window.localStorage.getItem(`${STORAGE_KEY}_${key}`);

  return JSON.parse(data!);
}
export function setStorageItem(key: string, value: string[]) {
  if (typeof window === "undefined") return;

  const data = JSON.stringify(value);

  return window.localStorage.setItem(`${STORAGE_KEY}_${key}`, data);
}

export const setCookies = (key: string, value: string) => {

  cookies().set(`${STORAGE_KEY}_${key}`, value, {
    maxAge: TOKEN_EXPIRATION_TIME, 
    secure: process.env.NODE_ENV === 'production',
    path: "/", 
  });
};
