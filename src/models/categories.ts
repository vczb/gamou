import { Category } from "@/types/category";
import connection from "@/database/connection";


export const insertCategoryModel = async (
  data: {
    title: string;
    description?: string;
    image?: string;
    active?: boolean;
    user_id: number;
  }
): Promise<Category | undefined> => {
  try {
    const [newCategory] = await connection<Category>("categories")
      .insert(data)
      .returning("*"); 

    return newCategory || undefined;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

export const selectCategoryByIdAndUserTokenModel = async (
  data: { id: string; user_id: string }
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


export const selectCategoriesModel = async (
  props: Partial<Category>
): Promise<Category[] | undefined> => {
  try {
    const categories = await connection<Category>("categories").where(props);
    return categories || undefined;
  } catch (error) {
    console.error("Error querying categories:", error);
    throw error;
  }
};


export const selectCategoryModel = async (
  props: Partial<Category>
): Promise<Category | undefined> => {
  try {
    const category = await connection<Category>("categories")
      .where(props)
      .first();
    return category || undefined;
  } catch (error) {
    console.error("Error querying category:", error);
    throw error;
  }
};


export const updateCategoryModel = async (
  data: {
    id: number;
    title?: string;
    description?: string;
    image?: string;
    active?: boolean;
  }
): Promise<Category | undefined> => {
  try {
    const updateData: Partial<Category> = {};
    if (data.title) updateData.title = data.title;
    if (data.description) updateData.description = data.description;
    if (data.image) updateData.image = data.image;
    if (data.active !== undefined) updateData.active = data.active;

    const [updatedCategory] = await connection<Category>("categories")
      .where({ id: data.id })
      .update(updateData)
      .returning("*"); 

    return updatedCategory || undefined;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};


export const deleteCategoryModel = async (
  data: { id: number }
): Promise<number> => {
  try {
    const result = await connection("categories").where({ id: data.id }).del();
    return result; // Returns the number of rows deleted
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};
