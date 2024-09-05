import { signUp } from "@/controllers/users";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, password } = body;
    const data = await signUp(email, password);

    const { status } = data;

    return NextResponse.json(data, { status });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
