import { 
  insertCategoryModel, 
  deleteCategoryModel, 
  updateCategoryModel, 
  selectCategoriesModel, 
  selectCategoryByIdAndUserTokenModel, 
  selectCategoryModel 
} from "@/models/categories";
import { verifySessionToken } from "@/utils/criptography";
import {
  badRequest,
  ok,
  serverError,
  unauthorized,
  unprocessableEntity,
} from "@/utils/http-helpers";
import { getCookie } from "@/utils/storage/server";

export const fetchCategoryByIdAndUserToken = async ({ token, categoryId }: { token: string, categoryId: string }) => {
  try {
    const { id: userId } = verifySessionToken(token) as { id?: string };

    if (!userId) {
      return unauthorized("Não foi possível verificar a autenticidade do usuário");
    }

    const category = await selectCategoryByIdAndUserTokenModel({ user_id: userId, id: categoryId });

    if (!category) {
      return unprocessableEntity("Categoria não encontrada para este usuário.");
    }

    const data = { category };

    return ok("Dados da categoria carregados com sucesso!", data);
  } catch (error) {
    console.error("Error fetching category:", error);
    return unprocessableEntity("Ocorreu um erro ao buscar as categorias.");
  }
};

export const fetchAllCategoriesByUserToken = async ({ token }: { token: string }) => {
  try {
    const { id: userId } = verifySessionToken(token) as { id?: number };

    if (!userId) {
      return unauthorized("Não foi possível verificar a autenticidade do usuário");
    }

    const categories = await selectCategoriesModel({ user_id: userId });

    const data = { categories };

    return ok("Dados das categorias carregados com sucesso!", data);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return unprocessableEntity("Ocorreu um erro ao buscar a categoria.");
  }
};


export const modifyCategory = async ({ id, title, image, description, active }: { id: number, title: string, image: string, description: string, active: boolean }) => {
  try {
    const token = getCookie("token");

    if (!token?.value) {
      return serverError("Não foi possível checar a autenticidade da requisição");
    }
    const { id: userId } = verifySessionToken(token.value) as { id?: number };

    if (!userId) {
      return unauthorized("Não foi possível verificar a autenticidade do usuário");
    }

    if (!id) {
      return badRequest("Erro no corpo da requisição");
    }

    const updatedCategory = await updateCategoryModel({ id, title, image, description, active });

    if (!updatedCategory) {
      return unprocessableEntity("Não foi possível atualizar a categoria.");
    }

    const data = { category: updatedCategory };

    return ok("Categoria atualizada com sucesso!", data);
  } catch (error) {
    console.error("Error updating category:", error);
    return unprocessableEntity("Ocorreu um erro ao atualizar a categoria.");
  }
};

export const createCategory = async ({ title, image, description, active }: { title: string, image: string, description: string, active: boolean }) => {
  try {
    const token = getCookie("token");

    if (!token?.value) {
      return serverError("Não foi possível checar a autenticidade da requisição");
    }
    const { id: userId } = verifySessionToken(token.value) as { id?: number };

    if (!userId) {
      return unauthorized("Não foi possível verificar a autenticidade do usuário");
    }

    const newCategory = await insertCategoryModel({ title, image, description, active, user_id: userId });

    if (!newCategory) {
      return unprocessableEntity("Não foi possível criar a categoria.");
    }

    const data = { category: newCategory };

    return ok("Categoria criada com sucesso!", data);
  } catch (error) {
    console.error("Error creating category:", error);
    return unprocessableEntity("Ocorreu um erro ao criar a categoria.");
  }
};

export const removeCategory = async ({ categoryId }: { categoryId: string }) => {
  try {
    const token = getCookie("token");

    if (!token?.value) {
      return serverError("Não foi possível checar a autenticidade da requisição");
    }
    const { id: userId } = verifySessionToken(token.value) as { id?: number };

    if (!userId) {
      return unauthorized("Não foi possível verificar a autenticidade do usuário");
    }

    const existingCategory = await selectCategoryModel({ id: parseInt(categoryId), user_id: userId });

    if (!existingCategory) {
      return unprocessableEntity("Categoria não encontrada para este usuário.");
    }

    const deletedCategory = await deleteCategoryModel({ id: parseInt(categoryId) });

    if (!deletedCategory) {
      return unprocessableEntity("Não foi possível deletar a categoria.");
    }

    return ok("Categoria deletada com sucesso!");
  } catch (error) {
    console.error("Error deleting category:", error);
    return unprocessableEntity("Ocorreu um erro ao deletar a categoria.");
  }
};
