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
        return this.unprocessableEntity("Usuário não foi encontrado");
      }

      delete user.password; // Ensure password is not returned

      return this.ok("Dados do usuário carregados com sucesso!", { user });
    } catch (error) {
      return this.serverError("Erro ao carregar os dados do usuário");
    }
  }

  async selectUserByToken() {
    try {

      const userId = await this.verifyToken()

      if (!userId) {
        return this.unprocessableEntity("Usuário não foi encontrado");
      }

      return await this.selectUserById(userId);

    } catch (error) {
      return this.serverError("Erro ao carregar os dados do usuário");
    }
  }

  async updateUser({name}: {name:string}){
    try {

      const userId = await this.verifyToken()

      if (!userId) {
        return this.unprocessableEntity("Usuário não foi encontrado");
      }

      const userModel = new UserModel();

      const user = await userModel.update(userId, { name });

      const data = {
        user,
      };

      return this.ok("Usuário editado com sucesso!", data);
      
    } catch (error) {
      return this.serverError("Erro ao atualizar o usuário");
    }
  }

  async deleteUser(id: string | number){
    try {

      const userId = await this.verifyToken()

      if (!userId) {
        return this.unprocessableEntity("Usuário não foi encontrado");
      }

      if (id != userId){
        return this.unprocessableEntity(
          "Não foi possível verificar a autenticidade do usuário"
        );
      }

      const userModel = new UserModel();

      const result = await userModel.deleteUserAndStorageAssets(id)

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
        return this.badRequest("Email e senha são obrigatórios");
      }

      const userModel = new UserModel();

      const hashPassword = await encrypt(password);

      const user = await userModel.createUserWithCompany({email, password: hashPassword});

      if (!user?.id) {
        return this.unprocessableEntity("Erro ao cadastrar-se. Tente novamente mais tarde");
      }

      const jwt = createSessionToken(user.id);
      setCookies("token", jwt);

      return this.ok("Usuário criado com sucesso!", { user: { id: user.id } });
    } catch (error: any) {
      console.error("Error during registration:", error);
      if (error.constraint === "users_email_unique") {
        return this.serverError("Este email já está em uso");
      }
      return this.serverError("Algo deu errado durante o cadastro");
    }
  }

  async signIn(email: string, password: string) {
    try {
      if (!email || !password) {
        return this.badRequest("Email e senha são obrigatórios");
      }

      const userModel = new UserModel();

      const user = await userModel.selectFirst({email});

      if (!user?.password) {
        return this.unauthorized("Email ou Senha inválidos");
      }

      const isPasswordValid = await decrypt(password, user.password);

      if (!isPasswordValid) {
        return this.unauthorized("Email e senha são obrigatórios");
      }

      const jwt = createSessionToken(user.id);
      setCookies("token", jwt);

      delete user.password;

      return this.ok("Autenticado com sucesso", { user });
    } catch (error) {
      console.error("Error during login:", error);
      return this.serverError("Algo deu errado durante a autenticação do usuário, tente novamente mais tarde.");
    }
  }
}
