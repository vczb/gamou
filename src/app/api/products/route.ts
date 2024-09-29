import { createProduct, modifyProduct, removeProduct, fetchProductByIdAndUserToken, fetchAllProductsByUserToken } from "@/controllers/products";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const data = await modifyProduct(body);
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

    const data = await createProduct(body);
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

    const data = await removeProduct(productId);
    const { status } = data;
    return NextResponse.json(data, { status });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ message: "Erro interno." }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
    const productId = searchParams.get("id");

    if (!token) {
      return NextResponse.json({ message: "Token não fornecido." }, { status: 400 });
    }

    if (productId) {
      const data = await fetchProductByIdAndUserToken({ token, productId });
      const { status } = data;
      return NextResponse.json(data, { status });
    } else {
      const data = await fetchAllProductsByUserToken(token);
      const { status } = data;
      return NextResponse.json(data, { status });
    }
  } catch (error) {
    console.error("Error fetching product(s):", error);
    return NextResponse.json({ message: "Erro interno." }, { status: 500 });
  }
}
