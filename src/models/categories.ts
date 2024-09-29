import { Category } from "@/types/category";
import connection from "@/database/connection"; // Adjust the path to your Knex connection


/**
 * Create a new category record with provided data.
 * @param {Partial<Category>} data - The data to create the category with.
 * @returns {Promise<Category | undefined>} - Returns the created category if successful, otherwise undefined.
 */
export const createCategory = async (
  data: Partial<Category>
): Promise<Category | undefined> => {
  try {
    const [newCategory] = await connection<Category>("categories")
      .insert(data)
      .returning("*"); // Ensure your DB supports 'returning'

    return newCategory || undefined;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

export const getCategoryByIdAndUserId = async (
  data: {id: string, user_id: string}
): Promise<Category | undefined> => {
  try {
    const category = await connection<Category>("categories")
      .where(data)
      .first();
    return category || undefined;
  } catch (error) {
    console.error("Error querying category by id and userId:", error);
    throw error;
  }
};

export const queryCategories = async (
  props: Partial<Category>
): Promise<Category[] | undefined> => {
  try {
    const category = await connection<Category>("categories").where(props)
    return category || undefined;
  } catch (error) {
    console.error("Error querying category:", error);
    throw error;
  }
};

export const queryCategory = async (
  props: Partial<Category>
): Promise<Category | undefined> => {
  try {
    const category = await connection<Category>("categories").where(props).first()
    return category || undefined;
  } catch (error) {
    console.error("Error querying category:", error);
    throw error;
  }
};

/**
 * Update a category record with new data.
 * @param {number} id - The ID of the category to update.
 * @param {Partial<Category>} data - The data to update the category with.
 * @returns {Promise<Category | undefined>} - Returns the updated category if successful.
 */
export const editCategory = async (
  id: number,
  data: Partial<Category>
): Promise<Category | undefined> => {
  try {
    const [updatedCategory] = await connection<Category>("categories")
      .where({ id })
      .update(data)
      .returning("*"); // Ensure your DB supports 'returning'

    return updatedCategory || undefined;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

export const destroyCategory = async (id: string) => {
  const result = await connection("categories").where({ id }).del();

  return result; // Returns the number of rows deleted
};