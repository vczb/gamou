import { tetsConnection } from "@/models/users"

export const signIn = async () => {
  await tetsConnection()
}

