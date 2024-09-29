import { createProduct, destroyProduct, editProduct, queryProducts, getProductByIdAndUserId, queryProduct } from "@/models/products";
import { Product } from "@/types/product";
import { verifySessionToken } from "@/utils/criptography";
import {
  badRequest,
  ok,
  serverError,
  unauthorized,
  unprocessableEntity,
} from "@/utils/http-helpers";
import { getCookie } from "@/utils/storage/server";

export const getProduct = async ({token, productId}: {token: string, productId: string}) => {
  try {
    const { id: userId } = verifySessionToken(token) as { id?: number };

    if (!userId) {
      return unauthorized(
        "Não foi possível verificar a autenticidade do usuário"
      );
    }

    const product = await getProductByIdAndUserId({ user_id: String(userId), id: productId });

    if (!product) {
      return unprocessableEntity("Produto não encontrado para este usuário.");
    }

    const data = {
      product,
    };

    return ok("Dados do produto carregados com sucesso!", data);
  } catch (error) {
    return unprocessableEntity("Ocorreu um erro ao buscar os produtos.");
  }
};

export const getProducts = async (token: string) => {
  try {
    const { id: userId } = verifySessionToken(token) as { id?: number };

    if (!userId) {
      return unauthorized(
        "Não foi possível verificar a autenticidade do usuário"
      );
    }

    const products = await queryProducts({ user_id: userId });

    const data = {
      products,
    };

    return ok("Dados dos produtos carregados com sucesso!", data);
  } catch (error) {
    console.error("Error fetching product:", error);
    return unprocessableEntity("Ocorreu um erro ao buscar o produto.");
  }
};

export const updateProduct = async (productData: Partial<Product>) => {
  try {
    const token = getCookie("token");

    if (!token?.value) {
      return serverError(
        "Não foi possível checar a autenticidade da requisição"
      );
    }
    const { id: userId } = verifySessionToken(token.value) as { id?: number };

    if (!userId) {
      return unauthorized(
        "Não foi possível verificar a autenticidade do usuário"
      );
    }

    if(!productData.id) {
      return badRequest("Erro no corpo da requisição")
    }

    const updatedProduct = await editProduct(productData.id, productData);

    if (!updatedProduct) {
      return unprocessableEntity("Não foi possível atualizar o produto.");
    }

    const data = {
      product: updatedProduct,
    };

    return ok("Produto atualizado com sucesso!", data);
  } catch (error) {
    console.error("Error updating product:", error);
    return unprocessableEntity("Ocorreu um erro ao atualizar o produto.");
  }
};

export const createProductHandler = async (productData: Partial<Product>) => {
  try {
    const token = getCookie("token");

    if (!token?.value) {
      return serverError(
        "Não foi possível checar a autenticidade da requisição"
      );
    }
    const { id: userId } = verifySessionToken(token.value) as { id?: number };

    if (!userId) {
      return unauthorized(
        "Não foi possível verificar a autenticidade do usuário"
      );
    }

    const newProduct = await createProduct({
      ...productData,
      user_id: userId,
    });

    if (!newProduct) {
      return unprocessableEntity("Não foi possível criar o produto.");
    }

    const data = {
      product: newProduct,
    };

    return ok("Produto criado com sucesso!", data);
  } catch (error) {
    console.error("Error creating product:", error);
    return unprocessableEntity("Ocorreu um erro ao criar o produto.");
  }
};

export const deleteProduct = async (productId: string) => {
  try {
    const token = getCookie("token");

    if (!token?.value) {
      return serverError(
        "Não foi possível checar a autenticidade da requisição"
      );
    }
    const { id: userId } = verifySessionToken(token.value) as { id?: number };

    if (!userId) {
      return unauthorized(
        "Não foi possível verificar a autenticidade do usuário"
      );
    }

    const existingProduct = await queryProduct({ id: parseInt(productId), user_id: userId });

    if (!existingProduct) {
      return unprocessableEntity("Produto não encontrado para este usuário.");
    }

    const deletedProduct = await destroyProduct(productId);

    if (!deletedProduct) {
      return unprocessableEntity("Não foi possível deletar o produto.");
    }

    return ok("Produto deletado com sucesso!");
  } catch (error) {
    console.error("Error deleting product:", error);
    return unprocessableEntity("Ocorreu um erro ao deletar o produto.");
  }
};
