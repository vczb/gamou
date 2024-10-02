import Product from "@/containers/Product";
import { CategoryController } from "@/controllers/CategoryController";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Novo produto",
  description: "Preencha o formuário para criar uma nova produto.",
};

const Index = async () => {
  const categoryController = new CategoryController();

  const categoryResponse =
    await categoryController.selectAllCategoriesByToken();

  if (categoryResponse.status !== 200) {
    throw new Error(categoryResponse.message);
  }

  const { categories } = categoryResponse.data;

  return <Product action="create" categories={categories} />;
};

export default Index;
