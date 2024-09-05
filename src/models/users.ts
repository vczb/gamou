import connection from "@/database/connection";
import { User } from "@/types/user";
import { encrypt } from "@/utils/criptography";


export const queryUser = async (email: string): Promise<User | undefined> => {
  const user = await connection("users")
    .select("*")
    .where({ email })
    .first()

  return user;
};

export const createUser = async (params: {email: string, password: string}) => {
  const { email, password } = params;
  const hashPassword = await encrypt(password);
  const user = await connection("users")
    .insert({
      email,
      password: hashPassword,
    })
    .returning("id");

  return user;
};
export const deleteUser = async () => {};
export const updateUser = async () => {};


