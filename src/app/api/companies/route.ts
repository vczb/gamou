import { CompanyController } from "@/controllers/CompanyController";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const { name, image, active, currency, phone } = body;

    if (!name || !image || !phone || active === undefined || !currency) {
      console.error("Invalid request body.")
      return NextResponse.json({ message: "Algo deu errado na requisição, revise os campos do formulário e tente novamente." }, { status: 400 });
    }

    const controller = new CompanyController()

    const data = await controller.updateCompany(body)

    const { status } = data;
    return NextResponse.json(data, { status });
  } catch (error) {
    console.error("Error updating company:", error);
    return NextResponse.json({ message: "Erro interno, tente novamente mais tarde" }, { status: 500 });
  }
}
