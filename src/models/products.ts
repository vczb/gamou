import { Product } from "@/types/product";
import connection from "@/database/connection";


export const insertProductModel = async (
  data: Product
): Promise<Product | undefined> => {
  try {
    const [newProduct] = await connection<Product>("products")
      .insert(data)
      .returning("*"); 

    return newProduct || undefined;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};


export const selectProductByIdAndUserTokenModel = async (
  data: { id: string; user_id: string }
): Promise<Product | undefined> => {
  try {
    const product = await connection<Product>("products")
      .where(data)
      .first();
    return product || undefined;
  } catch (error) {
    console.error("Error querying product by id and userId:", error);
    throw error;
  }
};


export const selectProductsModel = async (
  props: Partial<Product>
): Promise<Product[] | undefined> => {
  try {
    const products = await connection<Product>("products").where(props);
    return products || undefined;
  } catch (error) {
    console.error("Error querying products:", error);
    throw error;
  }
};

export const selectJoinProductsModel = async (
  props: Partial<Product> & {userId: string}
): Promise<(Product & { categoryTitle: string; categoryImage: string })[] | undefined> => {
  try {
    const products = await connection<Product>("products")
      .join("categories", "products.category_id", "=", "categories.id")
      .join("companies", "products.company_id", "=", "companies.id")
      .select("products.*", "categories.title as categoryTitle", "categories.image as categoryImage")
      .where("companies.user_id", props.userId);  // Specify "companies.user_id"
      
    return products || undefined;
  } catch (error) {
    console.error("Error querying products with category title and image:", error);
    throw error;
  }
};


export const selectProductModel = async (
  props: Partial<Product>
): Promise<Product | undefined> => {
  try {
    const product = await connection<Product>("products")
      .where(props)
      .first();
    return product || undefined;
  } catch (error) {
    console.error("Error querying product:", error);
    throw error;
  }
};


export const updateProductModel = async (
  id: number,
  data: Partial<Product>
): Promise<Product | undefined> => {
  try {
    const updateData: Partial<Product> = {};
    if (data.title) updateData.title = data.title;
    if (data.description) updateData.description = data.description;
    if (data.image) updateData.image = data.image;
    if (data.active !== undefined) updateData.active = data.active;
    if (data.price !== undefined) updateData.price = data.price;
    if (data.amount !== undefined) updateData.amount = data.amount;
    if (data.category_id !== undefined) updateData.category_id = data.category_id;

    const [updatedProduct] = await connection<Product>("products")
      .where({ id: id })
      .update(updateData)
      .returning("*"); 

    return updatedProduct || undefined;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};


export const deleteProductModel = async (data: { id: number }): Promise<number> => {
  try {
    const result = await connection("products").where({ id: data.id }).del();
    return result; // Returns the number of rows deleted
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
