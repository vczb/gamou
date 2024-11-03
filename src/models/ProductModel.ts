import connection from "@/database/connection";
import { BaseModel } from "./BaseModel";
import { Product } from "@/types/product";
import { deleteFile } from "@/utils/file";
import { AttributeVariantProps } from "@/components/AttributeVariant";

export class ProductModel extends BaseModel<Product> {
  constructor() {
    super("products");
  }

  async selectAllProductVariantsByCompanyId(companyId: number){  
    try {
      // Step 1: Fetch all products for the given company ID along with basic category info if needed
      const products = await connection("products")
        .leftJoin("categories", "products.category_id", "categories.id")
        .where("products.company_id", companyId)
        .select(
          "products.id as productId",
          "products.title",
          "products.description",
          "products.image",
          "products.price",
          "products.amount",
          "products.category_id",
          "categories.title as categoryTitle",
          "categories.image as categoryImage",
          "products.company_id",
          "products.active",
          "products.created_at",
          "products.updated_at"
        );
  
      // Step 2: Fetch all product variants related to these products
      const productIds = products.map(product => product.productId);
      const productVariants = await connection("product_variants")
        .whereIn("product_id", productIds)
        .select("id", "title", "isRequired", "isMultiple", "product_id");
  
      // Step 3: Fetch all variant options associated with these variants
      const variantIds = productVariants.map(variant => variant.id);
      const variantItems = await connection("variant_options")
        .whereIn("variant_id", variantIds)
        .select("id", "name", "variant_id");
  
      // Step 4: Group the data by product, variants, and items
      const structuredProducts = products.map(product => {
        // Get the variants associated with this product
        const variants = productVariants
          .filter(variant => variant.product_id === product.productId)
          .map(variant => {
            // Get items associated with this variant
            const items = variantItems
              .filter(item => item.variant_id === variant.id)
              .map(item => ({
                name: item.name,
              }));
  
            return {
              title: variant.title,
              isRequired: variant.isRequired,
              isMultiple: variant.isMultiple,
              options: items,
            } as AttributeVariantProps;
          });
  
        // Construct the final product structure
        return {
          id: product.productId,
          title: product.title,
          description: product.description,
          image: product.image,
          price: product.price,
          amount: product.amount,
          category_id: product.category_id,
          categoryTitle: product.categoryTitle,
          categoryImage: product.categoryImage,
          company_id: product.company_id,
          active: product.active,
          created_at: product.created_at,
          updated_at: product.updated_at,
          variants,
        } as Product;
      });
  
      return structuredProducts;
    } catch (error) {
      console.error("Error fetching products with variants and options:", error);
      throw error;
    }
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
  
  async createProductWithVariants(data: Partial<Product>) {
    const transaction = await connection.transaction();
  
    try {
      // Step 1: Separate variants from the main product data
      const { variants, ...productData } = data;
  
      // Step 2: Insert the main product data and retrieve the inserted product
      const [newProduct] = await transaction("products").insert(productData).returning("*");
  
      // Step 3: Insert variants and options if provided
      if (variants && variants.length > 0) {
        for (const variant of variants) {
          const [insertedVariant] = await transaction("product_variants").insert(
            {
              title: variant.title,
              isRequired: variant.isRequired || false,
              isMultiple: variant.isMultiple || false,
              product_id: newProduct.id,
            },
            ["id"]
          );
  
          const variantId = insertedVariant.id;
  
          if (variant.options && variant.options.length > 0) {
            for (const option of variant.options) {
              await transaction("variant_options").insert({
                name: option.name,
                variant_id: variantId,
              });
            }
          }
        }
      }
  
      // Commit the transaction after all inserts are successful
      await transaction.commit();
  
      // Include the variants in the returned product structure
      newProduct.variants = variants;
  
      return newProduct;
    } catch (error) {
      // Rollback the transaction if something goes wrong
      await transaction.rollback();
      console.error("Error creating product with variants and options:", error);
      throw error;
    }
  }

  async updateProductWithVariantsAndDeletePrevImage(id: number, data: Partial<Product>) {
    const transaction = await connection.transaction();

    try {
      // Step 1: Fetch the current product to get the existing image URL
      const [existingProduct] = await transaction("products")
        .where({ id })
        .select("image");
  
      // Step 2: Update the product with the new data (excluding variants)
      const { variants, ...productData } = data; // separate variants from product data

      const [updatedProduct] = await transaction("products")
        .where({ id })
        .update(productData)
        .returning("*");
  
      // Step 3: Delete existing variants and options for this product
      const variantIds = await transaction("product_variants")
        .where({ product_id: id })
        .select("id");
  
      // Extract just the ids of the variants
      const variantIdArray = variantIds.map(v => v.id);
  
      if (variantIdArray.length) {
        await transaction("variant_options").whereIn("variant_id", variantIdArray).del();
        await transaction("product_variants").where({ product_id: id }).del();
      }
  
      // Step 4: Insert new variants and options if provided
      if (variants && variants.length > 0) {
        for (const variant of variants) {
          const [insertedVariant] = await transaction("product_variants").insert(
            {
              title: variant.title,
              isRequired: variant.isRequired || false,
              isMultiple: variant.isMultiple || false,
              product_id: id,
            },
            ["id"]
          );
  
          const variantId = insertedVariant.id; // Extract the id property from the inserted variant
  
          if (variant.options && variant.options.length > 0) {
            for (const option of variant.options) {
              await transaction("variant_options").insert({
                name: option.name,
                variant_id: variantId,
              });
            }
          }
        }
      }
  
      // Commit the transaction after all updates are successful
      await transaction.commit();
  
      // Step 5: If the product had an old image and a new image is being uploaded, delete the old image
      if (existingProduct.image && data.image && existingProduct.image !== data.image) {
        const path = process.cwd() + "/public/" + existingProduct.image;
        await deleteFile(path);
      }

      updatedProduct.variants = variants
  
      return updatedProduct || undefined;
    } catch (error) {
      // Rollback the transaction if something goes wrong
      await transaction.rollback();
      console.error("Error updating product, variants, and deleting previous image:", error);
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
