import { signUp } from "@/controllers/users";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email e senha são obrigatórios." },
        { status: 400 }
      );
    }

    const data = await signUp(email, password);

    if (!data) {
      return NextResponse.json(
        { message: "Falha ao criar usuário." },
        { status: 500 }
      );
    }

    const { status } = data;

    return NextResponse.json(data, { status });
  } catch (error) {
    console.error("Error during sign up:", error);
    return NextResponse.json(
      { message: "Erro interno." },
      { status: 500 }
    );
  }
}
