import connection from "@/database/connection";
import { User } from "@/types/user";
import { encrypt } from "@/utils/criptography";

type QueryUserParams = { id?: number; email?: string };


export const selectUserModel = async (params: QueryUserParams): Promise<User | undefined> => {
  try {
    const query = connection("users").select("*");

    if (params.id) {
      query.where({ id: params.id });
    } else if (params.email) {
      query.where({ email: params.email });
    }

    const user = await query.first();
    return user || undefined;
  } catch (error) {
    console.error("Error querying user:", error);
    throw error;
  }
};


export const insertUserModel = async (params: { email: string; password: string }): Promise<number[]> => {
  try {
    const { email, password } = params;
    const hashPassword = await encrypt(password);
    const user = await connection("users")
      .insert({
        email,
        password: hashPassword,
      })
      .returning("id");

    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};


export const deleteUserModel = async (params: { id: string }): Promise<number> => {
  try {
    const result = await connection("users").where({ id: params.id }).del();
    return result; // Returns the number of rows deleted
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};


export const updateUserModel = async (params: { id: number; name?: string; password?: string }): Promise<User[]> => {
  try {
    const updateData: Partial<User> = {};

    if (params.name) updateData.name = params.name;
    if (params.password) updateData.password = await encrypt(params.password);

    if (Object.keys(updateData).length === 0) {
      throw new Error("No fields to update");
    }

    const updatedUser = await connection("users")
      .where({ id: params.id })
      .update(updateData)
      .returning(["id", "name", "email"]);

    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};


export const insertUserWithCompanyModel = async (params: { email: string; password: string }): Promise<User> => {
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
      console.error("Error creating user with company:", error);
      throw error;
    }
  });
};
