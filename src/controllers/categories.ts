import { createCategory, destroyCategory, editCategory, queryCategories, getCategoryByIdAndUserId, queryCategory } from "@/models/categories";
import { Category } from "@/types/category";
import { verifySessionToken } from "@/utils/criptography";
import {
  badRequest,
  ok,
  serverError,
  unauthorized,
  unprocessableEntity,
} from "@/utils/http-helpers";
import { getCookie } from "@/utils/storage/server";

export const getCategory = async ({token, categoryId}: {token: string, categoryId: string}) => {
  try {
    const { id: userId } = verifySessionToken(token) as { id?: number };

    if (!userId) {
      return unauthorized(
        "Não foi possível verificar a autenticidade do usuário"
      );
    }

    const category = await getCategoryByIdAndUserId({ user_id: String(userId), id: categoryId });

    if (!category) {
      return unprocessableEntity("Categoria não encontrada para este usuário.");
    }

    const data = {
      category,
    };

    return ok("Dados da categoria carregados com sucesso!", data);
  } catch (error) {
    return unprocessableEntity("Ocorreu um erro ao buscar as categorias.");
  }
};

export const getCategories = async (token: string) => {
  try {
    const { id: userId } = verifySessionToken(token) as { id?: number };

    if (!userId) {
      return unauthorized(
        "Não foi possível verificar a autenticidade do usuário"
      );
    }

    const categories = await queryCategories({ user_id: userId });

    const data = {
      categories,
    };

    return ok("Dados das categorias carregados com sucesso!", data);
  } catch (error) {
    console.error("Error fetching category:", error);
    return unprocessableEntity("Ocorreu um erro ao buscar a categoria.");
  }
};

export const updateCategory = async (categoryData: Partial<Category>) => {
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

    if(!categoryData.id) {
      return badRequest("Erro no corpo da requisição")
    }

    const updatedCategory = await editCategory(categoryData.id, categoryData);

    if (!updatedCategory) {
      return unprocessableEntity("Não foi possível atualizar a categoria.");
    }

    const data = {
      category: updatedCategory,
    };

    return ok("Categoria atualizada com sucesso!", data);
  } catch (error) {
    console.error("Error updating category:", error);
    return unprocessableEntity("Ocorreu um erro ao atualizar a categoria.");
  }
};

export const createCategoryHandler = async (categoryData: Partial<Category>) => {
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

    const newCategory = await createCategory({
      ...categoryData,
      user_id: userId,
    });

    if (!newCategory) {
      return unprocessableEntity("Não foi possível criar a categoria.");
    }

    const data = {
      category: newCategory,
    };

    return ok("Categoria criada com sucesso!", data);
  } catch (error) {
    console.error("Error creating category:", error);
    return unprocessableEntity("Ocorreu um erro ao criar a categoria.");
  }
};

export const deleteCategory = async (categoryId: string) => {
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

    const existingCategory = await queryCategory({ id: parseInt(categoryId), user_id: userId });

    if (!existingCategory) {
      return unprocessableEntity("Categoria não encontrada para este usuário.");
    }

    const deletedCategory = await destroyCategory(categoryId);

    if (!deletedCategory) {
      return unprocessableEntity("Não foi possível deletar a categoria.");
    }

    return ok("Categoria deletada com sucesso!");
  } catch (error) {
    console.error("Error deleting category:", error);
    return unprocessableEntity("Ocorreu um erro ao deletar a categoria.");
  }
};