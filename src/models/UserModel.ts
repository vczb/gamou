import connection from "@/database/connection";

import { BaseModel } from "./BaseModel";
import { User } from "@/types/user";

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
}
