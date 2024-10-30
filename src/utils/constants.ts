import packageJson from "../../package.json"

export const APP_VERSION  = packageJson?.version || ""
export const CURRENCY = "R$";
export const GAMOU_PHONE_NUMBER = "5551991901783";
export const TOKEN_SECRET = process.env.TOKEN_SECRET;
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const TOKEN_EXPIRATION_TIME = 86400; // 24 hours
export const STORAGE_KEY = `GAMOU_${APP_VERSION}`;
export const MEGABITE = 1000000 