import { updateCompany } from "@/controllers/companies";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const name = body?.name;
    const image = body?.image;
    const description = body?.description;
    const active = body?.active;
    const currency = body?.currency;

    const data = await updateCompany({
      name,
      image,
      description,
      active,
      currency,
    });

    const { status } = data;
    return NextResponse.json(data, { status });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Erro interno." }, { status: 500 });
  }
}
