import { cookies } from "next/headers";

export const setCookies = (key: string, value: string) => {
  cookies().set(key, value);
};
