import { OrderController } from "@/controllers/OrderController";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const controller = new OrderController();
    const id = Number(params.id);
    
    if (!id) {
      return NextResponse.json(
        { error: "ID inválido" },
        { status: 400 }
      );
    }
    
    // return await controller.getOrderById(id);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar pedido" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
) {
  try {
    const controller = new OrderController();
    const { status, id } = await request.json();

    if (!id || !status) {
      console.error("Invalid request body.")
      return NextResponse.json({ message: "Algo deu errado na requisição, revise os campos do formulário e tente novamente." }, { status: 400 });
    }

    const data = await controller.updateOrder({status, id})
    
    return NextResponse.json(data, { status:  data?.status});

  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar status do pedido" },
      { status: 500 }
    );
  }
}