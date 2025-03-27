import { CompanyModel } from "@/models/CompanyModel";
import { BaseController } from "./BaseController";
import { OrderModel } from "@/models/OrderModel";
import { Order } from "@/types/order";

export class OrderController extends BaseController {
  private orderModel: OrderModel;

  constructor() {
    super();
    this.orderModel = new OrderModel();
  }

  async createOrder(data: Partial<Order>) {
    try {
  
      const order = await this.orderModel.create({
        ...data,
        items: JSON.stringify(data.items) as unknown as Order['items']
      });

      if (!order) {
        return this.serverError("Erro ao criar pedido");
      }

      return this.ok("Pedido criado com sucesso", { order });
    } catch (error: any) {
      return this.serverError(error.message);
    }
  }

  async selectAllOrdersByToken() {
      try {
        const userId = await this.verifyToken();
  
        if (!userId) {
          return this.unprocessableEntity("Usuário não foi encontrado");
        }
  
        const companyModel = new CompanyModel();
  
        const company =
          await companyModel.selectPrimaryCompanyWithSettingsByUserId(userId);
  
        if (!company) {
          return this.unprocessableEntity(
            "Falha ao carregar os dados da empresa"
          );
        }
  
        const orderModel = new OrderModel();
  
        const orders = await orderModel.selectOrdersByCompanyId(
          company.id
        );
  
        const data = {
          orders: orders || [],
        };
  
        return this.ok("Dados dos pedidos carregados com sucesso!", data);
      } catch (error) {
        console.error("Error fetching order by token:", error);
        return this.unprocessableEntity("Ocorreu um erro ao buscar os pedidos.");
      }
    }

  async updateOrder({status, id}: Pick<Order, 'status' | 'id'>){

    if(!id || !status) {
      return this.badRequest('Dados insuficientes para executar a operação')
    }

    const userId = await this.verifyToken();
  
    if (!userId) {
      return this.unprocessableEntity("Usuário não foi encontrado");
    }

    const companyModel = new CompanyModel();
  
    const company =
      await companyModel.selectPrimaryCompanyWithSettingsByUserId(userId);

    if (!company) {
      return this.unprocessableEntity(
        "Falha ao carregar os dados da empresa"
      );
    }

    const orderModel = new OrderModel();

    const order = await orderModel.updateOrderStatus(id, status)

    const data = {
      order: order,
    };

    return this.ok("Status do pedido atualizado com sucesso", data)
  }
}