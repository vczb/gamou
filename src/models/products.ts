import { Product } from "@/types/product";
import connection from "@/database/connection"; // Adjust the path to your Knex connection

/**
 * Create a new product record with provided data.
 * @param {Partial<Product>} data - The data to create the product with.
 * @returns {Promise<Product | undefined>} - Returns the created product if successful, otherwise undefined.
 */
export const createProduct = async (
  data: Partial<Product>
): Promise<Product | undefined> => {
  try {
    const [newProduct] = await connection<Product>("products")
      .insert(data)
      .returning("*"); // Ensure your DB supports 'returning'

    return newProduct || undefined;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const getProductByIdAndUserId = async (
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

export const queryProducts = async (
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

export const queryProduct = async (
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

/**
 * Update a product record with new data.
 * @param {number} id - The ID of the product to update.
 * @param {Partial<Product>} data - The data to update the product with.
 * @returns {Promise<Product | undefined>} - Returns the updated product if successful.
 */
export const editProduct = async (
  id: number,
  data: Partial<Product>
): Promise<Product | undefined> => {
  try {
    const [updatedProduct] = await connection<Product>("products")
      .where({ id })
      .update(data)
      .returning("*"); // Ensure your DB supports 'returning'

    return updatedProduct || undefined;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const destroyProduct = async (id: string) => {
  const result = await connection("products").where({ id }).del();

  return result; // Returns the number of rows deleted
};
