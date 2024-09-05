import { HttpResponse } from "@/types/http";

export const ok = (message: string, data: any = {}): HttpResponse => ({
  status: 200,
  message,
  data,
});

export const badRequest = (message: string): HttpResponse => ({
  status: 400,
  message,
  data: null,
});

export const serverError = (message: string): HttpResponse => ({
  status: 500,
  message,
  data: null,
});

export const unprocessableEntity = (message: string): HttpResponse => ({
  status: 422,
  message,
  data: null,
});

export const unauthorized = (message: string): HttpResponse => ({
  status: 401,
  message,
  data: null,
});