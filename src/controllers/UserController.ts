import { UserModel } from "@/models/UserModel";
import { BaseController } from "./BaseController";
import { createSessionToken, decrypt, encrypt } from "@/utils/criptography";
import { setCookies } from "@/utils/storage/server";

export class UserController extends BaseController {
  async selectUserById(userId: number) {
    try {
      const userModel = new UserModel();
      const user = await userModel.selectFirst({id: userId});

      if (!user) {
        return this.unprocessableEntity("User not found.");
      }

      delete user.password; // Ensure password is not returned

      return this.ok("User fetched successfully.", { user });
    } catch (error) {
      return this.serverError("Error fetching user.");
    }
  }

  async selectUserByToken() {
    try {

      const userId = await this.verifyToken()

      if (!userId) {
        return this.unprocessableEntity("User not found.");
      }

      return await this.selectUserById(userId);

    } catch (error) {
      return this.serverError("Error fetching user.");
    }
  }

  async updateUser({name}: {name:string}){
    try {

      const userId = await this.verifyToken()

      if (!userId) {
        return this.unprocessableEntity("User not found.");
      }

      const userModel = new UserModel();

      const user = await userModel.update(userId, { name });

      const data = {
        user,
      };

      return this.ok("Usuário editado com sucesso!", data);
      
    } catch (error) {
      return this.serverError("Error modifying user.");
    }
  }

  async deleteUser(id: string | number){
    try {

      const userId = await this.verifyToken()

      if (!userId) {
        return this.unprocessableEntity("User not found.");
      }

      if (id != userId){
        return this.unprocessableEntity(
          "Não foi possível verificar a autenticidade do usuário"
        );
      }

      const userModel = new UserModel();

      const result = await userModel.delete(id)

      if (result === 0) {
        return this.unprocessableEntity("Não foi possível deletar o usuário");
      }

      setCookies("token", "");

      return this.ok("Usuário deletado com sucesso!");
      
    } catch (error) {
      return this.serverError("Algo deu errado durante a exclusão do usuário.");
    }
  }


  /***********
  *** AUTH ***
  ***********/

  async signUp(email: string, password: string) {
    try {
      if (!email || !password) {
        return this.badRequest("Email and Password are required!");
      }

      const userModel = new UserModel();

      const hashPassword = await encrypt(password);

      const user = await userModel.createUserWithCompany({email, password: hashPassword});

      if (!user?.id) {
        return this.unprocessableEntity("Registration failed. Please try again.");
      }

      const jwt = createSessionToken(user.id);
      setCookies("token", jwt);

      return this.ok("User registered successfully!", { user: { id: user.id } });
    } catch (error: any) {
      console.error("Error during registration:", error);
      if (error.constraint === "users_email_unique") {
        return this.serverError("This email is already registered.");
      }
      return this.serverError("Something went wrong during registration.");
    }
  }

  async signIn(email: string, password: string) {
    try {
      if (!email || !password) {
        return this.badRequest("Email and Password are required!");
      }

      const userModel = new UserModel();

      const user = await userModel.selectFirst({email});

      if (!user?.password) {
        return this.unauthorized("Invalid email or password.");
      }

      const isPasswordValid = await decrypt(password, user.password);

      if (!isPasswordValid) {
        return this.unauthorized("Invalid email or password.");
      }

      const jwt = createSessionToken(user.id);
      setCookies("token", jwt);

      delete user.password;

      return this.ok("Login successful!", { user });
    } catch (error) {
      console.error("Error during login:", error);
      return this.serverError("Something went wrong during login.");
    }
  }
}
