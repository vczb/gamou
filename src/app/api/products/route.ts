import { ProductController } from "@/controllers/ProductController";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const controller = new ProductController()

    const data = await controller.updateProduct(body);
    const { status } = data;
    return NextResponse.json(data, { status });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ message: "Erro interno." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.title || !body.price) {
      return NextResponse.json({ message: "Título e preço são obrigatórios." }, { status: 400 });
    }
    const controller = new ProductController()

    const data = await controller.createProduct(body);
    const { status } = data;
    return NextResponse.json(data, { status });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ message: "Erro interno." }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("id");

    if (!productId) {
      return NextResponse.json({ message: "ID do produto não fornecido." }, { status: 400 });
    }

    const controller = new ProductController()

    const data = await controller.deleteProduct(productId as unknown as number);
    const { status } = data;
    return NextResponse.json(data, { status });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ message: "Erro interno." }, { status: 500 });
  }
}
