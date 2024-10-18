import path from 'path';

import connection from "@/database/connection";

import { BaseModel } from "./BaseModel";
import { User } from "@/types/user";
import { deleteDirectory } from "@/utils/file";
import { generateHashId } from "@/utils/criptography";

export class UserModel extends BaseModel<User> {
  constructor() {
    super("users");
  }

  async createUserWithCompany(params: { email: string; password: string }): Promise<User>  {
    
    return await connection.transaction(async (trx) => {
      try {

        const { email, password } = params;
     
        const [user] = await trx("users")
          .insert({
            email,
            password,
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
  }


  async deleteUserAndStorageAssets(id: number | string) {
    const transaction = await connection.transaction();

    try{

      const result = await connection('users').where({ id }).del();

      await transaction.commit();

      const dirName = await generateHashId(id)
      const userDir = path.join(process.cwd(), 'public/uploads', dirName);
      
      await deleteDirectory(userDir);

      return result;

    } catch (error) {
      console.error("Error deleting user and storage:", error);
      throw error;
    }
  }
}
