import { CategoryController } from "@/controllers/CategoryController";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const id = body?.id;
    const title = body?.title;
    const image = body?.image;
    const description = body?.description;
    const active = body?.active;
    
    const controller = new CategoryController()

    const data = await controller.updateCategory({
      id,
      title,
      image,
      description,
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
    const active = body?.active;

    const categoryData = {
      title,
      image,
      description,
      active,
    };

    const controller = new CategoryController()

    const data = await controller.createCategory(categoryData);

    const { status } = data;

    return NextResponse.json(data, { status });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json({ message: "Erro interno." }, { status: 500 });
  }
}
