import sharp from 'sharp';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    // Extract user ID from headers
    const userId = request.headers.get("user-id");

    if (!userId) {
      return NextResponse.json({ error: 'Não foi possível identificar o usuário' }, { status: 401 });
    }

    // Parse form data to get the file
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'Falha ao salvar o arquivo' }, { status: 400 });
    }

    // Create user directory if it doesn't exist
    const userDir = path.join(process.cwd(), 'public/uploads', userId);
    fs.mkdirSync(userDir, { recursive: true });

    // Define file path and convert file to buffer
    const filePath = path.join(userDir, `${file.name.split('.')[0]}.png`);
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Process and save the image using sharp
    await sharp(buffer)
      .png({ quality: 80 })
      .toFile(filePath);

    // Return success response
    return NextResponse.json({ status: 200, success: true, filePath, message: 'Arquivo salvo com sucesso!' });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Erro interno." }, { status: 500 });
  }
}
