import { MEGABITE } from "../constants"
import renderFlashMessage from "../renderFlashMessage"

export const checkFileSize = (file: File, maxSize = MEGABITE) => {
  try {

    const size = file?.size

    if (!size) {
      throw new Error('Não foi possível espeficiar o tamanho do arquivo')
    }

    if (size == 0) {
      throw new Error('Arquivo de tamanho inválido ou corrompido, tente outra image')
    }
    
    if (size > maxSize) {
      throw new Error('A imagem está acima do peso máximo permitido, otimize o arquivo e tente novamente')
    }

    return true

  } catch (error: any) {
    console.error(error);
    renderFlashMessage({ message: error.message, variant: "alert" });
    return false
  }
}