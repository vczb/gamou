import sharp from 'sharp';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {

    const userId = request.headers.get("user-id");

    if (!userId) {
      return NextResponse.json({ error: 'Não foi possível identificar o usuário' }, { status: 401 });
    }
    
    const formData = await request.formData();
    const file = formData.get('file') as File;
  
    if (!file) {
      return NextResponse.json({ error: 'Falha ao salvar o arquivo' }, { status: 400 });
    }
  
    const userDir = path.join(process.cwd(), 'public/uploads', userId);
    fs.mkdirSync(userDir, { recursive: true });
  
    const filePath = path.join(userDir, `${file.name.split('.')[0]}.png`);
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
  
    await sharp(buffer)
      .png({ quality: 80 })
      .toFile(filePath);
  
    return NextResponse.json({ status: 200, success: true, filePath, message: 'Arquivo salvo com sucesso!' });
    
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Erro interno." }, { status: 500 });
  }

}
