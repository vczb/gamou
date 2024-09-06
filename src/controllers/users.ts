import { createUser, queryUser } from "@/models/users";
import { setCookies } from "@/utils/browserStorage";
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
      return badRequest("Email and Password are required!");
    }

    const user = await queryUser(email);

    if (!user?.password) {
      return unauthorized("Invalid email or password.");
    }

    const isPasswordValid = await decrypt(password, user.password);

    if (!isPasswordValid) {
      return unauthorized("Invalid email or password.");
    }

    if (!user?.id) {
      return unprocessableEntity(
        "User could not be created due to validation or business logic failure"
      );
    }

    const jwt = createSessionToken(user.id);

    setCookies('token', jwt);

    delete user.password;

    const data = {
      user,
    };

    return ok("Login successful", data);
  } catch (error) {
    console.log(error);
    return serverError("Something went wrong during sign-in");
  }
};

export const signUp = async (email: string, password: string) => {
  try {
    if (!email || !password) {
      return badRequest("Email and Password are required!");
    }

    const [user] = await createUser({ email, password });

    if (!user?.id) {
      return unprocessableEntity(
        "User could not be created due to validation or business logic failure"
      );
    }

    const userId = user.id;

    const jwt = createSessionToken(userId);

    setCookies('token', jwt);

    const data = {
      user: {
        id: userId,
      },
    };

    return ok("User Created Sucessfully!", data);
  } catch (error) {
    console.log(error);
    // TODO: Improve logging and error handling
    return serverError("Something went wrong when creating a new user");
  }
};
