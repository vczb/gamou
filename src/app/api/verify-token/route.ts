import { TOKEN_SECRET } from "@/utils/constants";
import { verifySeesionToken } from "@/utils/criptography";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { token } = body;

    if (!TOKEN_SECRET) {
      throw new Error("variável TOKEN_SECRET não pode ser nula");
    }

    verifySeesionToken(token);

    return NextResponse.json({ valid: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error", valid: false },
      { status: 500 }
    );
  }
}
