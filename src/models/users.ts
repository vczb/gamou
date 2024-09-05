import connection from "@/database/connection";
import { User } from "@/types/user";
import { encrypt } from "@/utils/criptography";

export const tetsConnection = async () => {
  const data = await connection("users").count();
  console.log(data);
}

export const createUser = async (params:User) => {
  const {email, password} = params
  const hashPassword = await encrypt(password)
  const user = await connection("users").insert({
    email,
    password: hashPassword
  })

  return user
}
export const deleteUser = async () => {}
export const updateUser = async () => {}
export const queryUser = async () => {}