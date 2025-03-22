import { OrderController } from "@/controllers/OrderController";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const controller = new OrderController();
    const data = await request.json();
    
    return await controller.createOrder(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao processar pedido" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const controller = new OrderController();
    const { searchParams } = new URL(request.url);
    
    const companyId = searchParams.get("company_id");
    
    if (!companyId) {
      return NextResponse.json(
        { error: "ID da empresa é obrigatório" },
        { status: 400 }
      );
    }
    
    return await controller.getOrdersByCompanyId(Number(companyId));
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar pedidos" },
      { status: 500 }
    );
  }
}