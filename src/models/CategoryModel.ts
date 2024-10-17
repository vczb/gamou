import { BaseModel } from "./BaseModel";
import { Category } from "@/types/category";
import connection from "@/database/connection";
import { deleteFile } from "@/utils/file";

export class CategoryModel extends BaseModel<Category> {
  constructor() {
    super("categories");
  }

  async updateCategoryAndDeletePrevImage(id: number, data: Partial<Category>) {
    const transaction = await connection.transaction();
  
    try {
      // Fetch the current category to get the existing image URL
      const [existingCategory] = await transaction('categories')
        .where({ id })
        .select('image');
  
      // Update the category with the new data
      const [updatedCategory] = await transaction('categories')
        .where({ id })
        .update(data)
        .returning('*');
  
      // Commit the transaction before performing the image deletion
      await transaction.commit();
  
      // If the category had an old image and a new image is being uploaded, delete the old image
      if (existingCategory.image && data.image && existingCategory.image !== data.image) {
        const path = process.cwd() + '/public/' + existingCategory.image;
        await deleteFile(path);
      }
  
      return updatedCategory || undefined;
  
    } catch (error) {
      // Rollback the transaction if something goes wrong
      await transaction.rollback();
      console.error('Error updating category and deleting previous image:', error);
      throw error;
    }
  }

  async deleteCategoryAndImage(id: number) {
    const transaction = await connection.transaction();

    try{

      const [existingCategory] = await transaction('categories')
      .where({ id })
      .select('image');

      const result = await connection('categories').where({ id }).del();

      await transaction.commit();

      if(existingCategory.image){
        const path = process.cwd() + '/public/' + existingCategory.image;
        await deleteFile(path);
      }

      return result;

    } catch (error) {
      console.error("Error deleting category and image:", error);
      throw error;
    }
  }
}
