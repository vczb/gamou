import Products from "@/containers/Products";
import { ProductController } from "@/controllers/ProductController";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gerencia seus produtos",
  description: "Adicione, edite ou exclua seus produtos.",
};

const Index = async () => {
  const controller = new ProductController();
  const response = await controller.selectAllProductsByToken();

  if (response.status !== 200) {
    throw new Error(response.message);
  }

  const { products } = response.data;

  return <Products products={products} />;
};

export default Index;
