import { BaseModel } from "./BaseModel";
import { Category } from "@/types/category";
import connection from "@/database/connection";

export class CategoryModel extends BaseModel<Category> {
  constructor() {
    super("categories");
  }
}
