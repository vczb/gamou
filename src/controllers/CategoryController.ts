import { BaseController } from "./BaseController";
import { CategoryModel } from "@/models/CategoryModel";

export class CategoryController extends BaseController {
 
  async selectAllCategoriesByToken(){
    try {
      const userId = await this.verifyToken()

      if (!userId) {
        return this.unprocessableEntity("Usuário não foi encontrado");
      }

      const company = await this.selectPrimaryCompanyByUserId(userId);

      if (!company) {
        return this.unprocessableEntity("Falha ao carregar os dados da empresa");
      }

      const categoryModel = new CategoryModel();

      const categories = await categoryModel.select({company_id: company.id})

      const data = {
        categories: categories || [],
      };

      return this.ok("Dados das categorias carregados com sucesso!", data);

    } catch (error) {
      console.error("Error fetching company:", error);
      return this.unprocessableEntity("Ocorreu um erro ao buscar as categorias.");
    }
  }

  async selectCategoryById(id: number) {
    try {
      const categoryModel = new CategoryModel();
      const category = await categoryModel.selectFirst({ id });

      if (!category) {
        return this.unprocessableEntity("Usuário não foi encontrado");
      }

      const data = {
        category,
      };

      return this.ok("Category fetched successfully.",data);
    } catch (error) {
      return this.serverError("Error fetching category.");
    }
  }

  async createCategory({
    title,
    image,
    description,
    active,
  }: {
    title: string;
    image: string;
    description: string;
    active: boolean;
  }){

    try {

      const userId = await this.verifyToken()

      if (!userId) {
        return this.unprocessableEntity("Usuário não foi encontrado");
      }

      const company = await this.selectPrimaryCompanyByUserId(userId);

      if (!company) {
        return this.unprocessableEntity("Falha ao carregar os dados da empresa");
      }

      const categoryModel = new CategoryModel();

      const newCategory = await categoryModel.create({
        title,
        image,
        description,
        active,
        company_id: company.id,
      })

      if (!newCategory) {
        return this.unprocessableEntity("Não foi possível criar a categoria.");
      }

      const data = { category: newCategory };

      return this.ok("Categoria criada com sucesso!", data);
      
    } catch (error: any) {
      console.error("Error creating category:", error);
      if (error.code === "22001") {
        return this.serverError("Erro por motivo de texto muito longo.");
      }
      return this.unprocessableEntity("Ocorreu um erro ao criar a categoria.");
    }
    
  }

  async updateCategory({
    id,
    title,
    image,
    description,
    active,
  }: {
    id: number;
    title: string;
    image: string;
    description: string;
    active: boolean;
  }){

    try {

      const userId = await this.verifyToken()

      if (!userId) {
        return this.unprocessableEntity("Usuário não foi encontrado");
      }

      const company = await this.selectPrimaryCompanyByUserId(userId);

      if (!company) {
        return this.unprocessableEntity("Falha ao carregar os dados da empresa");
      }

      const categoryModel = new CategoryModel();

      const updatedCategory = await categoryModel.updateCategoryAndDeletePrevImage(id,{
        title,
        image,
        description,
        active,
        company_id: company.id,
      })

      if (!updatedCategory) {
        return this.unprocessableEntity("Não foi possível atualizar a categoria.");
      }

      const data = { category: updatedCategory };

      return this.ok("Categoria atualizada com sucesso!", data);
      
    } catch (error:any) {
      console.error("Error updating category:", error);
      if (error.code === "22001") {
        return this.serverError("Erro por motivo de texto muito longo.");
      }
      return this.unprocessableEntity("Ocorreu um erro ao atualizar a categoria.");
    }
    
  }

  async deleteCategory(id: number){

    try {

      const userId = await this.verifyToken()

      if (!userId) {
        return this.unprocessableEntity("Usuário não foi encontrado");
      }

      const company = await this.selectPrimaryCompanyByUserId(userId);

      if (!company) {
        return this.unprocessableEntity("Falha ao carregar os dados da empresa");
      }

      const categoryModel = new CategoryModel();

      const existingCategory = await categoryModel.select({ id, company_id: company.id });

      if (!existingCategory) {
        return this.unprocessableEntity("Categoria não encontrada para este usuário.");
      }

      const deletedCategory = await categoryModel.deleteCategoryAndImage(id);

      if (!deletedCategory) {
        return this.unprocessableEntity("Não foi possível deletar a categoria.");
      }

      return this.ok("Categoria deletada com sucesso!");
      
    } catch (error) {
      console.error("Error updating category:", error);
      return this.unprocessableEntity("Ocorreu um erro ao deletada a categoria.");
    }
    
  }
  
}
