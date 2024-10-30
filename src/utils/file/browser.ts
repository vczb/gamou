import { MEGABITE } from "../constants"
import renderFlashMessage from "../renderFlashMessage"

export const checkFileMaxSize = (file: File, maxSize = MEGABITE) => {
  try {

    const size = file?.size
    
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