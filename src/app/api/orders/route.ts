import { OrderController } from "@/controllers/OrderController";
import { Order } from "@/types/order";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body: Partial<Order> = await request.json();

    if (!body.company_id || !body.items?.length) {
      return NextResponse.json({ message: "Dados incompletos." }, { status: 400 });
    }
    const controller = new OrderController()

    const data = await controller.createOrder(body);
    const { status } = data;
    return NextResponse.json(data, { status });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ message: "Erro interno." }, { status: 500 });
  }
}