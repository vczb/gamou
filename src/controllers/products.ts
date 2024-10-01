import {
  insertProductModel,
  deleteProductModel,
  updateProductModel,
  selectProductByIdAndUserTokenModel,
  selectProductModel,
  selectProductsWithCategoryModel,
} from "@/models/products";
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

export const fetchProductByIdAndUserToken = async ({
  token,
  productId,
}: {
  token: string;
  productId: string;
}) => {
  try {
    const { id: userId } = verifySessionToken(token) as { id?: string };

    if (!userId) {
      return unauthorized(
        "Não foi possível verificar a autenticidade do usuário"
      );
    }

    const product = await selectProductByIdAndUserTokenModel({
      user_id: userId,
      id: productId,
    });

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

export const fetchAllProductsByUserToken = async (token: string) => {
  try {
    const { id: userId } = verifySessionToken(token) as { id?: number };

    if (!userId) {
      return unauthorized(
        "Não foi possível verificar a autenticidade do usuário"
      );
    }

    const products = await selectProductsWithCategoryModel({ user_id: userId });

    const data = {
      products,
    };

    return ok("Dados dos produtos carregados com sucesso!", data);
  } catch (error) {
    console.error("Error fetching product:", error);
    return unprocessableEntity("Ocorreu um erro ao buscar o produto.");
  }
};

// TODO: Refactor to query by CompanyId instead of userId
export const fetchAllProductsByCompanyId = async ({
  userId,
}: {
  userId: number;
}) => {
  try {
    if (!userId) {
      return badRequest("Não foi possível verificar o ID da empresa");
    }

    const products = await selectProductsWithCategoryModel({
      user_id: userId,
    });

    const data = {
      products,
    };

    return ok("Dados dos produtos carregados com sucesso!", data);
  } catch (error) {
    console.error("Error fetching product:", error);
    return unprocessableEntity("Ocorreu um erro ao buscar o produto.");
  }
};

export const modifyProduct = async (productData: Partial<Product>) => {
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

    if (!productData.id) {
      return badRequest("Erro no corpo da requisição");
    }

    const updatedProduct = await updateProductModel(
      productData.id,
      productData
    );

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

export const createProduct = async (productData: Partial<Product>) => {
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

    const payload = {
      ...productData,
      user_id: userId as number,
    } as Product;

    const newProduct = await insertProductModel(payload);

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

export const removeProduct = async (productId: string) => {
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

    const existingProduct = await selectProductModel({
      id: parseInt(productId),
      user_id: userId,
    });

    if (!existingProduct) {
      return unprocessableEntity("Produto não encontrado para este usuário.");
    }

    const deletedProduct = await deleteProductModel({
      id: parseInt(productId),
    });

    if (!deletedProduct) {
      return unprocessableEntity("Não foi possível deletar o produto.");
    }

    return ok("Produto deletado com sucesso!");
  } catch (error) {
    console.error("Error deleting product:", error);
    return unprocessableEntity("Ocorreu um erro ao deletar o produto.");
  }
};
