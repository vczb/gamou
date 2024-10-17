import { CompanyModel } from "@/models/CompanyModel";
import { verifySessionToken } from "@/utils/criptography";
import { unauthorized, serverError, unprocessableEntity, badRequest, ok } from "@/utils/http-helpers";
import { getCookie } from "@/utils/storage/server";

export class BaseController {
  async verifyToken(): Promise<number | undefined> {
    try {

      const parsedToken = getCookie("token")?.value;

      if (!parsedToken) {
        throw new Error("Invalid token");
      }

      const { id: userId } = verifySessionToken(parsedToken) as { id?: number };
      return userId;
    } catch {
      return undefined;
    }
  }

  async selectPrimaryCompanyByUserId(userId: number) {
    try {
      const companyModel = new CompanyModel();
      const company = await companyModel.selectFirst({user_id: userId, sequence: 1})
      return company || undefined;
    } catch {
      return undefined;
    }
  }

  ok(message: string, data: any = {}) {
    return ok(message, data);
  }

  badRequest(message: string) {
    return badRequest(message);
  }

  unprocessableEntity(message: string) {
    return unprocessableEntity(message);
  }

  unauthorized(message: string) {
    return unauthorized(message);
  }

  serverError(message: string) {
    return serverError(message);
  }
}
