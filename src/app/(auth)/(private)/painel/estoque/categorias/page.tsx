import Categories from "@/containers/Categories";
import { CategoryController } from "@/controllers/CategoryController";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gerencia suas categorias",
  description: "Adicione, edite ou exclua suas categorias.",
};

const Index = async () => {
  const controller = new CategoryController();

  const response = await controller.selectAllCategoriesByToken();

  if (response.status !== 200) {
    throw new Error(response.message);
  }

  const { categories } = response.data;

  return <Categories categories={categories} />;
};

export default Index;
