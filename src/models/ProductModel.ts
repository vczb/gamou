import connection from "@/database/connection";
import { BaseModel } from "./BaseModel";
import { Product } from "@/types/product";

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
  
  
}
