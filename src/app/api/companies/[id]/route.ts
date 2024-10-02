import { UserController } from "@/controllers/UserController";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: {params: {id: string}}) {
  try {
    const { id } = params;

    const controller = new UserController()

    const data = await controller.deleteUser(id);

    const { status } = data;
    return NextResponse.json(data, { status });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error." }, { status: 500 });
  }
}
