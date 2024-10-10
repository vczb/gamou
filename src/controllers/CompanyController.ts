import { CompanyModel } from "@/models/CompanyModel";
import { BaseController } from "./BaseController";
import { slugify } from "@/utils/formatters";

export class CompanyController extends BaseController {
 
  async selectFirstCompanyByToken(){
    try {
      const userId = await this.verifyToken()

      if (!userId) {
        return this.unprocessableEntity("User not found.");
      }


      const company = await this.selectPrimaryCompanyByUserId(userId);

      const data = {
        company,
      };

      return this.ok("Dados da empresa carregados com sucesso!", data);

    } catch (error) {
      console.error("Error fetching company:", error);
      return this.unprocessableEntity("Ocorreu um erro ao buscar a empresa.");
    }
  }

  async selectCompanyBySlug(slug: string){
    try {

      const companyModel = new CompanyModel()

      const company = await companyModel.selectFirst({slug})

      const data = {
        company,
      };

      return this.ok("Dados da empresa carregados com sucesso!", data);

    } catch (error) {
      console.error("Error fetching company:", error);
      return this.unprocessableEntity("Ocorreu um erro ao buscar a empresa.");
    }
  }

  async updateCompany({
    name,
    image,
    phone,
    description,
    active,
    currency,
  }: {
    name: string;
    image: string;
    description: string;
    phone: string;
    active: boolean;
    currency: string;
  }){
    try {
      
      const userId = await this.verifyToken()
  
      if (!userId) {
        return this.unprocessableEntity("User not found.");
      }

      const companyModel = new CompanyModel();

      const companySlug = slugify(name);

      const company = await this.selectPrimaryCompanyByUserId(userId);

      if (!company) {
        return this.unprocessableEntity("Falha ao carregar os dados da empresa");
      }


      const updatedCompany = await companyModel.update(company.id, {
        slug: companySlug,
        name,
        phone,
        image,
        description,
        active,
        currency,
      })

      if (!updatedCompany) {
        return this.unprocessableEntity("Não foi possível atualizar a empresa.");
      }

      const data = {
        company: updatedCompany,
      };
  
      return this.ok("Empresa atualizada com sucesso!", data);

    } catch (error) {
      return this.serverError("Error modifying user.");
    }

  }
}
