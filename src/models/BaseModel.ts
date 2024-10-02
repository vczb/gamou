import connection from "@/database/connection";

export class BaseModel<T> {
  tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  async create(data: Partial<T>): Promise<T | undefined> {
    try {
      const [newRecord] = await connection(this.tableName)
        .insert(data)
        .returning("*");
      return newRecord || undefined;
    } catch (error) {
      this.logError("Create", error);
      throw error;
    }
  }

  async select(props: Partial<T>): Promise<T[] | undefined> {
    try {
      const record = await connection(this.tableName).where(props);
      return record || undefined;
    } catch (error) {
      this.logError("Select", error);
      throw error;
    }
  }

  async selectFirst(props: Partial<T>): Promise<T | undefined> {
    try {
      const record = await connection(this.tableName).where(props).first();
      return record || undefined;
    } catch (error) {
      this.logError("Select", error);
      throw error;
    }
  }

  async update(id: number, data: Partial<T>): Promise<T | undefined> {
    try {
      const [updatedRecord] = await connection(this.tableName)
        .where({ id })
        .update(data)
        .returning("*");
      return updatedRecord || undefined;
    } catch (error) {
      this.logError("Update", error);
      throw error;
    }
  }

  async delete(id: number | string): Promise<number> {
    try {
      const result = await connection(this.tableName).where({ id }).del();
      return result;
    } catch (error) {
      this.logError("Delete", error);
      throw error;
    }
  }

  logError(operation: string, error: any) {
    console.error(`Error during ${operation} in table ${this.tableName}:`, error);
  }
}
