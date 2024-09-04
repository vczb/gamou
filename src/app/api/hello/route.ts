import { tetsConnection } from '@/models/users'
import { NextResponse } from 'next/server'
 
export async function GET(request: Request) {

  await tetsConnection()
  return NextResponse.json({ msg: 'Hello from server' })
}