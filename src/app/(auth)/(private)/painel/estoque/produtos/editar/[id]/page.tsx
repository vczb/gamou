import Product from "@/containers/Product";
import { CategoryController } from "@/controllers/CategoryController";
import { ProductController } from "@/controllers/ProductController";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editar produto",
  description: "Preencha o formuário para editar uma produto existente",
};

export default async function Index({ params }: { params: { id: number } }) {
  const id = params.id;

  const productController = new ProductController();
  const categoryController = new CategoryController();

  const productResponse = await productController.selectProductById(id);
  const categoryResponse =
    await categoryController.selectAllCategoriesByToken();

  if (productResponse.status !== 200) {
    throw new Error(productResponse.message);
  }
  if (categoryResponse.status !== 200) {
    throw new Error(categoryResponse.message);
  }

  const { product } = productResponse.data;
  const { categories } = categoryResponse.data;

  return <Product action="edit" product={product} categories={categories} />;
}
