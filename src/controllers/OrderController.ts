import { BaseController } from "./BaseController";
import { OrderModel } from "@/models/OrderModel";
import { NextResponse } from "next/server";
import { Order } from "@/types/order";

export class OrderController extends BaseController {
  private orderModel: OrderModel;

  constructor() {
    super();
    this.orderModel = new OrderModel();
  }

  async createOrder(data: Partial<Order>) {
    try {
      const userId = await this.verifyToken();
      
      if (!userId) {
        return this.unauthorized("Usuário não autorizado");
      }

      if (!data.customer_name || !data.items || !data.total || !data.company_id) {
        return this.badRequest("Dados incompletos");
      }

      const order = await this.orderModel.create(data);

      if (!order) {
        return this.serverError("Erro ao criar pedido");
      }

      return this.ok("Pedido criado com sucesso", { order });
    } catch (error: any) {
      return this.serverError(error.message);
    }
  }

  async getOrdersByCompanyId(companyId: number) {
    try {
      const userId = await this.verifyToken();
      
      if (!userId) {
        return this.unauthorized("Usuário não autorizado");
      }

      const company = await this.selectPrimaryCompanyByUserId(userId);
      
      if (!company || company.id !== companyId) {
        return this.unauthorized("Empresa não pertence ao usuário");
      }

      const orders = await this.orderModel.selectOrdersByCompanyId(companyId);

      return this.ok("Pedidos encontrados com sucesso", { orders });
    } catch (error: any) {
      return this.serverError(error.message);
    }
  }

  async getOrderById(id: number) {
    try {
      const userId = await this.verifyToken();
      
      if (!userId) {
        return this.unauthorized("Usuário não autorizado");
      }

      const order = await this.orderModel.selectFirst({ id });

      if (!order) {
        return this.badRequest("Pedido não encontrado");
      }

      const company = await this.selectPrimaryCompanyByUserId(userId);
      
      if (!company || company.id !== order.company_id) {
        return this.unauthorized("Pedido não pertence ao usuário");
      }

      return this.ok("Pedido encontrado com sucesso", { order });
    } catch (error: any) {
      return this.serverError(error.message);
    }
  }

  async updateOrderStatus(id: number, status: string) {
    try {
      const userId = await this.verifyToken();
      
      if (!userId) {
        return this.unauthorized("Usuário não autorizado");
      }

      const order = await this.orderModel.selectFirst({ id });

      if (!order) {
        return this.badRequest("Pedido não encontrado");
      }

      const company = await this.selectPrimaryCompanyByUserId(userId);
      
      if (!company || company.id !== order.company_id) {
        return this.unauthorized("Pedido não pertence ao usuário");
      }

      const updatedOrder = await this.orderModel.updateOrderStatus(id, status);

      return this.ok("Status do pedido atualizado com sucesso", { order: updatedOrder });
    } catch (error: any) {
      return this.serverError(error.message);
    }
  }
}