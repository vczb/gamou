import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { BaseController } from './BaseController';
import { generateSHA256Hash } from '@/utils/criptography';

export class UploaderController extends BaseController {

  async createFileByToken({
    file
  }: {file: File}) {
    try {

      if (!file) {
        return this.badRequest("Erro ao processar arquivo")
      }
      
      const userId = await this.verifyToken()

      if (!userId) {
        return this.unprocessableEntity("Usuário não foi encontrado");
      }

      const dirName = await generateSHA256Hash(userId)
      
      // TODO: Move this to utils/file
      const userDir = path.join(process.cwd(), 'public/uploads', dirName);
      fs.mkdirSync(userDir, { recursive: true });

      const filePath = path.join(userDir, `${file.name.split('.')[0]}.png`);
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      await sharp(buffer)
        .png({ quality: 80 })
        .toFile(filePath);

      const data = {
        filePath
      }

      return this.ok("Arquivo criado com sucesso!", data)

    } catch (error) {
      console.error(error);
      return this.serverError("Erro ao criar o arquivo")
    }
  }
}
