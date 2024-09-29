import { createProductHandler, updateProduct, deleteProduct, getProduct, getProducts } from "@/controllers/products";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const id = body?.id;
    const title = body?.title;
    const image = body?.image;
    const description = body?.description;
    const price = body?.price;
    const amount = body?.amount;
    const category_id = body?.category_id;
    const active = body?.active;

    const data = await updateProduct({
      id,
      title,
      image,
      description,
      price,
      amount,
      category_id,
      active,
    });

    const { status } = data;
    return NextResponse.json(data, { status });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Erro interno." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const title = body?.title;
    const image = body?.image;
    const description = body?.description;
    const price = body?.price;
    const amount = body?.amount;
    const category_id = body?.category_id;
    const active = body?.active;

    const productData = {
      title,
      image,
      description,
      price,
      amount,
      category_id,
      active,
    };

    const data = await createProductHandler(productData);

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

    const data = await deleteProduct(productId);

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
      const data = await getProduct({ token, productId });
      const { status } = data;
      return NextResponse.json(data, { status });
    } else {
      const data = await getProducts(token);
      const { status } = data;
      return NextResponse.json(data, { status });
    }
  } catch (error) {
    console.error("Error fetching product(s):", error);
    return NextResponse.json({ message: "Erro interno." }, { status: 500 });
  }
}
