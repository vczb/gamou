import { ProductController } from "@/controllers/ProductController";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: {params: {id: number}}) {
  try {
    const { id } = params;

    const controller = new ProductController()

    const data = await controller.deleteProduct(id);

    const { status } = data;
    return NextResponse.json(data, { status });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error." }, { status: 500 });
  }
}
