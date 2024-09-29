import { updateCompanyModel, selectCompanyModel } from "@/models/companies";
import { verifySessionToken } from "@/utils/criptography";
import {
  ok,
  serverError,
  unauthorized,
  unprocessableEntity,
} from "@/utils/http-helpers";
import { getCookie } from "@/utils/storage/server";


export const fetchCompanyByUserToken = async ({ token }: { token: string }) => {
  try {
    const { id: userId } = verifySessionToken(token) as { id?: number };

    if (!userId) {
      return unauthorized(
        "Não foi possível verificar a autenticidade do usuário"
      );
    }

    const company = await selectCompanyModel({ user_id: userId });

    if (!company) {
      return unprocessableEntity("Empresa não encontrada para este usuário.");
    }

    const data = {
      company,
    };

    return ok("Dados da empresa carregados com sucesso!", data);
  } catch (error) {
    console.error("Error fetching company:", error);
    return unprocessableEntity("Ocorreu um erro ao buscar a empresa.");
  }
};


export const modifyCompany = async ({
  name,
  image,
  description,
  active,
  currency,
}: {
  name: string;
  image: string;
  description: string;
  active: boolean;
  currency: string;
}) => {
  try {
    const token = getCookie("token");

    if (!token?.value) {
      return serverError(
        "Não foi possível checar a autenticidade da requisição"
      );
    }
    const { id: userId } = verifySessionToken(token.value) as { id?: number };

    if (!userId) {
      return unauthorized(
        "Não foi possível verificar a autenticidade do usuário"
      );
    }

    const existingCompany = await selectCompanyModel({ user_id: userId });

    if (!existingCompany) {
      return unprocessableEntity("Empresa não encontrada para este usuário.");
    }

    const updatedCompany = await updateCompanyModel(existingCompany.id, {
      name,
      image,
      description,
      active,
      currency,
    });

    if (!updatedCompany) {
      return unprocessableEntity("Não foi possível atualizar a empresa.");
    }

    const data = {
      company: updatedCompany,
    };

    return ok("Empresa atualizada com sucesso!", data);
  } catch (error) {
    console.error("Error updating company:", error);
    return unprocessableEntity("Ocorreu um erro ao atualizar a empresa.");
  }
};
