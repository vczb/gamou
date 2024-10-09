import { NextResponse } from 'next/server';
import { UploaderController } from '@/controllers/UploadController';

export async function POST(request: Request) {
  try {


    const formData = await request.formData();
    const file = formData.get('file') as File;

    const controller = new UploaderController()

    const response = await controller.createFileByToken({file})

    const data = response.data
    const message = response.message
    const filePath = data?.filePath || ""

    return NextResponse.json({ status: 200, success: true, filePath, message });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Erro interno." }, { status: 500 });
  }
}
