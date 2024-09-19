import { queryComany } from "@/models/companies";
import { verifySessionToken } from "@/utils/criptography";
import { ok, unauthorized, unprocessableEntity } from "@/utils/http-helpers";

export const getCompany = async (token: string) => {
  const { id: userId } = verifySessionToken(token) as { id?: number };

  if (!userId) {
    return unauthorized(
      "Não foi possível verificar a autenticidade do usuário"
    );
  }

  const company = await queryComany({ id: userId });

  const data = {
    company,
  };

  return ok("Dados do usuários carregados com sucesso!", data);
};
