import {  removeUser } from "@/controllers/users";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: {params: {id: string}}) {
  try {
    const { id } = params;

    const data = await removeUser(id);

    const { status } = data;
    return NextResponse.json(data, { status });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error." }, { status: 500 });
  }
}
