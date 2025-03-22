import connection from "@/database/connection";
import { BaseModel } from "./BaseModel";
import { Order } from "@/types/order";

export class OrderModel extends BaseModel<Order> {
  constructor() {
    super("orders");
  }

  async selectOrdersByCompanyId(companyId: number) {
    try {
      const orders = await connection("orders")
        .select("*")
        .where("company_id", companyId)
        .orderBy("created_at", "desc");
      
      return orders || undefined;
    } catch (error) {
      this.logError("SelectOrdersByCompanyId", error);
      throw error;
    }
  }

  async selectOrdersByCompanyIdAndStatus(companyId: number, status: string) {
    try {
      const orders = await connection("orders")
        .select("*")
        .where({
          company_id: companyId,
          status
        })
        .orderBy("created_at", "desc");
      
      return orders || undefined;
    } catch (error) {
      this.logError("SelectOrdersByCompanyIdAndStatus", error);
      throw error;
    }
  }

  async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
    try {
      const [updatedOrder] = await connection(this.tableName)
        .where({ id })
        .update({ status })
        .returning("*");
      
      return updatedOrder || undefined;
    } catch (error) {
      this.logError("UpdateOrderStatus", error);
      throw error;
    }
  }
}