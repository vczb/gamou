import Products from "@/containers/Products";
import { getProducts } from "@/controllers/products";
import { getCookie } from "@/utils/storage/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Gerencia seus produtos",
  description: "Adicione, edite ou exclua seus produtos.",
};

const Index = async () => {
  const token = getCookie("token");

  if (!token?.value) {
    return redirect("/sair");
  }

  const response = await getProducts(token?.value);

  if (response.status !== 200) {
    throw new Error(response.message);
  }

  const { products } = response.data;

  return <Products products={products} />;
};

export default Index;
