import { createUser } from "@/models/users";
import { NextResponse } from "next/server";

 
export async function POST(req: Request) {
  try {
    

    const body = await req.json()

    const data = await createUser(body);

    if(!data) {
      throw new Error('Something wrong happen when create a new user')
    }
    
    return NextResponse.json({ok: true})

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

