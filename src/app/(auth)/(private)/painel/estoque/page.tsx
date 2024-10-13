import Inventory from "@/containers/Inventory";
import { CategoryController } from "@/controllers/CategoryController";
import { ProductController } from "@/controllers/ProductController";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gerencia seu estoque",
  description: "Gerencie seus produtos e categorias.",
};

const Index = async () => {
  const productController = new ProductController();
  const categoryController = new CategoryController();

  const [productResponse, categoryResponse] = await Promise.all([
    productController.selectAllProductsByToken(),
    categoryController.selectAllCategoriesByToken(),
  ]);

  const { products } = productResponse?.data || [];
  const { categories } = categoryResponse?.data || [];

  return <Inventory categories={categories} products={products} />;
};

export default Index;
