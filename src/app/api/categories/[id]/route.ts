import { CategoryController } from "@/controllers/CategoryController";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: {params: {id: number}}) {
  try {
    const { id } = params;

    const controller = new CategoryController()

    const data = await controller.deleteCategory(id);

    const { status } = data;
    return NextResponse.json(data, { status });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Erro interno, tente novamente mais tarde" }, { status: 500 });
  }
}
