import { createUser } from "@/models/users";
import { createSessionToken } from "@/utils/criptography";
import {
  badRequest,
  ok,
  serverError,
  unprocessableEntity,
} from "@/utils/http-helpers";

export const signIn = async () => {};

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

    const data = {
      token: jwt,
      user: {
        id: userId,
      },
    };

    const response = ok("User Created Sucessfully!", data);

    return response;
  } catch (error) {
    console.log(error);
    // TODO: Improve logging and error handling
    return serverError("Something went wrong when creating a new user");
  }
};
