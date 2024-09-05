import { tetsConnection } from "@/models/users"

export const signIn = async () => {
  await tetsConnection()
}

export const signUp = async (email: string, password: string) => {
  
}
