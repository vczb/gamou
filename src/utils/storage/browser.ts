import { STORAGE_KEY } from "../constants";

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

