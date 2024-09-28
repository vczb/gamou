import sharp from 'sharp';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  const userId = request.headers.get("user-id");

  if (!userId) {
    return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
  }
  
  const formData = await request.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  const userDir = path.join(process.cwd(), 'public/uploads', userId);
  fs.mkdirSync(userDir, { recursive: true });

  const filePath = path.join(userDir, `${file.name.split('.')[0]}.png`);
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  await sharp(buffer)
    .png({ quality: 80 })
    .toFile(filePath);

  return NextResponse.json({ success: true, filePath, message: 'File uploaded and converted to PNG successfully' });
}
