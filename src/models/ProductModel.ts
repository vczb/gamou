import connection from "@/database/connection";
import { BaseModel } from "./BaseModel";
import { Product } from "@/types/product";
import { deleteFile } from "@/utils/file";

export class ProductModel extends BaseModel<Product> {
  constructor() {
    super("products");
  }

  async selectProductsWithCategoryByCompanyId(companyId: number) {
    try {
      const products = await connection("products")
        .join("categories", "products.category_id", "=", "categories.id")
        .select("products.*", "categories.title as categoryTitle", "categories.image as categoryImage")
        .where("products.company_id", companyId); 
  
      return products || undefined;
    } catch (error) {
      console.error("Error querying products with category title and image:", error);
      throw error;
    }
  }


  async selectProductsByCompanySlug(slug: string) {
    try {
      const products = await connection("products")
        .join("categories", "products.category_id", "=", "categories.id")
        .join("companies", "products.company_id", "=", "companies.id")  // Join the companies table
        .select(
          "products.*", 
          "categories.title as categoryTitle", 
          "categories.image as categoryImage"
        )
        .where("products.active", true)
        .where("companies.slug", slug);
    
      return products || undefined;
    } catch (error) {
      console.error("Error querying products with category title and image by slug:", error);
      throw error;
    }
  }

  
  async selectProductsByCompanySlugAndQuery(slug: string, query?: string) {
    try {
      const productsQuery = connection("products")
        .join("categories", "products.category_id", "=", "categories.id")
        .join("companies", "products.company_id", "=", "companies.id")
        .select(
          "products.*", 
          "categories.title as categoryTitle", 
          "categories.image as categoryImage"
        )
        .where("products.active", true)
        .where("companies.slug", slug);
  
      if (query) {
        productsQuery.andWhere(function() {
          this.where("products.title", "ilike", `%${query}%`)
            .orWhere("products.description", "ilike", `%${query}%`)
            .orWhere("categories.title", "ilike", `%${query}%`)
            .orWhere("categories.description", "ilike", `%${query}%`);
        });
      }
  
      const products = await productsQuery;
  
      return products || undefined;
    } catch (error) {
      console.error("Error querying products with category title and image by slug and query:", error);
      throw error;
    }
  }
  

  async updateProductAndDeletePrevImage(id: number, data: Partial<Product>) {
    const transaction = await connection.transaction();
  
    try {
      // Fetch the current product to get the existing image URL
      const [existingProduct] = await transaction('products')
        .where({ id })
        .select('image');
  
      // Update the product with the new data
      const [updatedProduct] = await transaction('products')
        .where({ id })
        .update(data)
        .returning('*');
  
      // Commit the transaction before performing the image deletion
      await transaction.commit();
  
      // If the product had an old image and a new image is being uploaded, delete the old image
      if (existingProduct.image && data.image && existingProduct.image !== data.image) {
        const path = process.cwd() + '/public/' + existingProduct.image;
        await deleteFile(path);
      }
  
      return updatedProduct || undefined;
  
    } catch (error) {
      // Rollback the transaction if something goes wrong
      await transaction.rollback();
      console.error('Error updating product and deleting previous image:', error);
      throw error;
    }
  }


  async deleteProductAndImage(id: number) {
    const transaction = await connection.transaction();

    try{

      const [existingProduct] = await transaction('products')
      .where({ id })
      .select('image');

      const result = await connection('products').where({ id }).del();

      await transaction.commit();

      if(existingProduct.image){
        const path = process.cwd() + '/public/' + existingProduct.image;
        await deleteFile(path);
      }

      return result;

    } catch (error) {
      console.error("Error deleting product and image:", error);
      throw error;
    }
  }
  
}
