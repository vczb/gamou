import { createUser, queryUser } from "@/models/users";
import { setCookies } from "@/utils/storage/server";
import { createSessionToken, decrypt } from "@/utils/criptography";
import {
  badRequest,
  ok,
  serverError,
  unauthorized,
  unprocessableEntity,
} from "@/utils/http-helpers";

export const signIn = async (email: string, password: string) => {
  try {
    if (!email || !password) {
      return badRequest("Email e Senha são obrigatórios!");
    }

    const user = await queryUser(email);

    if (!user?.password) {
      return unauthorized("Email ou Senha incorretos");
    }

    const isPasswordValid = await decrypt(password, user.password);

    if (!isPasswordValid) {
      return unauthorized("Email ou Senha incorretos");
    }

    if (!user?.id) {
      return unprocessableEntity(
        "Não foi possível realizar esta operação. Tente novamente mais tarde"
      );
    }

    const jwt = createSessionToken(user.id);

    setCookies("token", jwt);

    delete user.password;

    const data = {
      user,
    };

    return ok("Autenticação realizada com sucesso!", data);
  } catch (error) {
    console.error(error);
    return serverError("Algo deu errado durante a autenticação do usuário");
  }
};

export const signUp = async (email: string, password: string) => {
  try {
    if (!email || !password) {
      return badRequest("Email e Password são obrigatórios!");
    }

    const [user] = await createUser({ email, password });

    if (!user?.id) {
      return unprocessableEntity(
        "Não foi possível realizar esta operação. Tente novamente mais tarde"
      );
    }

    const userId = user.id;

    const jwt = createSessionToken(userId);

    setCookies("token", jwt);

    const data = {
      user: {
        id: userId,
      },
    };

    return ok("Usuário cadastrado com sucesso!", data);
  } catch (error: any) {
    console.error(error);
    if (error.constraint === "users_email_unique") {
      return serverError("Este email já está cadastrado");
    }
    return serverError("Algo deu errado durante o cadastro do usuário.");
  }
};
