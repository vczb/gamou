import Category from "@/containers/Category";
import { CategoryController } from "@/controllers/CategoryController";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editar categoria",
  description: "Preencha o formuário para editar uma categoria existente",
};

export default async function Index({ params }: { params: { id: number } }) {
  const id = params.id;

  const controller = new CategoryController();

  const response = await controller.selectCategoryById(id);

  if (response.status !== 200) {
    throw new Error(response.message);
  }

  const { category } = response.data;

  return <Category action="edit" category={category} />;
}
