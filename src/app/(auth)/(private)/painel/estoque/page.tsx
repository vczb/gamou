import Inventory from "@/containers/Inventory";
import { CategoryController } from "@/controllers/CategoryController";
import { ProductController } from "@/controllers/ProductController";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gerencia seu estoque",
  description:
    "Adicione categorias e produtos. Ative ou desative para disponibilizar o inventório no seu site",
};

const Index = async () => {
  const productController = new ProductController();
  const categoryController = new CategoryController();

  const [productResponse, categoryResponse] = await Promise.all([
    productController.selectAllProductsByToken(),
    categoryController.selectAllCategoriesByToken(),
  ]);

  const { products, products_has_variants } = productResponse?.data || [];
  const { categories } = categoryResponse?.data || [];

  return (
    <Inventory
      categories={categories}
      products={products}
      products_has_variants={products_has_variants}
    />
  );
};

export default Index;
