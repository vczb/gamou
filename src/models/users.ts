import connection from "@/database/connection";
import { User } from "@/types/user";
import { encrypt } from "@/utils/criptography";

type QueryUserParams = { id: number } | { email: string };

export const queryUser = async (
  params: QueryUserParams
): Promise<User | undefined> => {
  const query = connection("users").select("*");

  if ("id" in params) {
    query.where({ id: params.id });
  } else {
    query.where({ email: params.email });
  }

  const user = await query.first();

  return user;
};

export const createUser = async (params: {
  email: string;
  password: string;
}) => {
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

export const destroyUser = async (id: string) => {
  const result = await connection("users").where({ id }).del();

  return result; // Returns the number of rows deleted
};

export const editUser = async ({
  id,
  name,
  password,
}: {
  id: number;
  name?: string;
  password?: string;
}) => {
  const updateData: Partial<User> = {};

  if (name) updateData.name = name;
  if (password) updateData.password = await encrypt(password);

  if (Object.keys(updateData).length === 0) {
    throw new Error("No fields to update");
  }

  const updatedUser = await connection("users")
    .where({ id })
    .update(updateData)
    .returning(["id", "name", "email"]);

  return updatedUser;
};

export const createUserWithCompany = async (params: {
  email: string;
  password: string;
}) => {
  const { email, password } = params;

  return await connection.transaction(async (trx) => {
    try {
      const hashPassword = await encrypt(password);

      const [user] = await trx("users")
        .insert({
          email,
          password: hashPassword,
        })
        .returning("*");

      const companyInsertData = {
        slug: user.id,
        name: "",
        user_id: user.id,
      };

      const [company] = await trx("companies")
        .insert(companyInsertData)
        .returning("*");

      return user;
    } catch (error) {
      throw error;
    }
  });
};
