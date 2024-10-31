import { Product } from "@/types/product";
import { BaseController } from "./BaseController";
import { ProductModel } from "@/models/ProductModel";

export class ProductController extends BaseController {
 
  async selectAllProductsByToken(){
    try {
      const userId = await this.verifyToken()

      if (!userId) {
        return this.unprocessableEntity("Usuário não foi encontrado");
      }

      const company = await this.selectPrimaryCompanyByUserId(userId);

      if (!company) {
        return this.unprocessableEntity("Falha ao carregar os dados da empresa");
      }

      const productModel = new ProductModel();

      // const products = await productModel.selectProductsWithCategoryByCompanyId(company.id)
      const products = await productModel.selectAllProductVariantsByCompanyId(company.id)
      // await productModel.selectAllProductVariantsByCompanyId(company.id)

      const data = {
        products: products || [],
      };

      return this.ok("Dados dos produtos carregados com sucesso!", data);

    } catch (error) {
      console.error("Error fetching products by token:", error);
      return this.unprocessableEntity("Ocorreu um erro ao buscar os produtos.");
    }
  }

  async selectProductById(id: number) {
    try {
      const productModel = new ProductModel();
      const product = await productModel.selectFirst({ id });

      const data = {
        product,
      };

      return this.ok("Produto carregado com sucesso!.",data);
    } catch (error) {
      return this.serverError("Erro ao carregar produto");
    }
  }

  async createProduct({
    title,
    image,
    description,
    active,
    amount,
    price,
    variants,
    category_id
  }: Product){

    try {

      const userId = await this.verifyToken()

      if (!userId) {
        return this.unprocessableEntity("Usuário não foi encontrado");
      }

      const company = await this.selectPrimaryCompanyByUserId(userId);

      if (!company) {
        return this.unprocessableEntity("Falha ao carregar os dados da empresa");
      }

      const productModel = new ProductModel();

      const newProduct = await productModel.createProductWithVariants({
        title,
        image,
        description,
        price,
        amount,
        active,
        variants,
        category_id,
        company_id: company.id,
      })

      if (!newProduct) {
        return this.unprocessableEntity("Não foi possível criar a produto.");
      }

      const data = { product: newProduct };

      return this.ok("Produto criado com sucesso!", data);
      
    } catch (error: any) {
      console.error("Error creating product:", error);
      if (error.code === "22001") {
        return this.serverError("Erro por motivo de texto muito longo.");
      }
      return this.unprocessableEntity("Ocorreu um erro ao criar a produto.");
    }
    
  }

  async updateProduct({
    id,
    title,
    image,
    description,
    active,
    amount,
    price,
    variants,
    category_id
  }: Product){

    try {

      const userId = await this.verifyToken()

      if (!userId) {
        return this.unprocessableEntity("Usuário não foi encontrado");
      }

      const company = await this.selectPrimaryCompanyByUserId(userId);

      if (!company) {
        return this.unprocessableEntity("Falha ao carregar os dados da empresa");
      }

      const productModel = new ProductModel();

      const updatedProduct = await productModel.updateProductWithVariantsAndDeletePrevImage(id,{
        title,
        image,
        description,
        price,
        amount,
        active,
        category_id,
        variants,
        company_id: company.id,
      })

      if (!updatedProduct) {
        return this.unprocessableEntity("Não foi possível atualizar a produto.");
      }

      const data = { product: updatedProduct };

      return this.ok("Produto atualizada com sucesso!", data);
      
    } catch (error: any) {
      console.error("Error updating product:", error);
      if (error.code === "22001") {
        return this.serverError("Erro por motivo de texto muito longo.");
      }
      return this.unprocessableEntity("Ocorreu um erro ao atualizar a produto.");
    }
    
  }

  async deleteProduct(id: number){

    try {

      const userId = await this.verifyToken()

      if (!userId) {
        return this.unprocessableEntity("Usuário não foi encontrado");
      }

      const company = await this.selectPrimaryCompanyByUserId(userId);

      if (!company) {
        return this.unprocessableEntity("Falha ao carregar os dados da empresa");
      }

      const productModel = new ProductModel();

      const existingProduct = await productModel.select({ id, company_id: company.id });

      if (!existingProduct) {
        return this.unprocessableEntity("Produto não encontrada para este usuário.");
      }

      const deletedProduct = await productModel.deleteProductAndImage(id);

      if (!deletedProduct) {
        return this.unprocessableEntity("Não foi possível deletar a produto.");
      }

      return this.ok("Produto deletado com sucesso!");
      
    } catch (error) {
      console.error("Error updating product:", error);
      return this.unprocessableEntity("Ocorreu um erro ao deletada a produto.");
    }
    
  }
  
}
