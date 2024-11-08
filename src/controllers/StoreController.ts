import { CompanyModel } from "@/models/CompanyModel";
import { BaseController } from "./BaseController";
import { ProductModel } from "@/models/ProductModel";
import { CategoryModel } from "@/models/CategoryModel";

export class StoreController extends BaseController {
 
  async selectStoreBySlug(slug: string){
    try {
    

      const companyModel = new CompanyModel()

      const company = await companyModel.selectPrimaryCompanyWithSettingsBySlug(slug)

      if (!company) {
        return this.unprocessableEntity("Falha ao carregar os dados da empresa");
      }

      const productModel = new ProductModel();

      const products = await productModel.selectProductsWithVariantsByCompanySlug(slug);

      const categoryModel = new CategoryModel()

      const categories = await categoryModel.select({company_id: company.id, active: true})

      const data = {
        products: products || [],
        categories: categories || [],
        company,
      };

      return this.ok("Dados da loja carregados com sucesso!", data);

    } catch (error) {
      console.error("Error fetching store by slug:", error);
      return this.unprocessableEntity("Ocorreu um erro ao buscar a loja.");
    }
  }

  async selectStoreBySlugAndQuery(slug: string, query?: string){
    try {
    
      const companyModel = new CompanyModel()

      const company = await companyModel.selectFirst({slug, active: true})

      if (!company) {
        return this.unprocessableEntity("Falha ao carregar os dados da empresa");
      }

      const productModel = new ProductModel();

      const products = await productModel.selectProductsByCompanySlugAndQuery(slug, query);

      const categoryModel = new CategoryModel()

      const categories = await categoryModel.select({company_id: company.id, active: true})

      const data = {
        products: products || [],
        categories: categories || [],
        company,
      };

      return this.ok("Dados da loja carregados com sucesso!", data);

    } catch (error) {
      console.error("Error fetching store by slug:", error);
      return this.unprocessableEntity("Ocorreu um erro ao buscar a loja.");
    }
  }
  
}
