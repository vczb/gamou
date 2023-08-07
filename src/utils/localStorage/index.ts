import { LS_KEY } from "../constants";

export function getStorageItem(key: string) {
  if (typeof window === "undefined") return;

  const data = window.localStorage.getItem(`${LS_KEY}_${key}`);

  return JSON.parse(data!);
}
export function setStorageItem(key: string, value: string[]) {
  if (typeof window === "undefined") return;

  const data = JSON.stringify(value);

  return window.localStorage.setItem(`${LS_KEY}_${key}`, data);
}
