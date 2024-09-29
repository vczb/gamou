import Product from "@/containers/Product";
import { getCategories } from "@/controllers/categories";
import { getCookie } from "@/utils/storage/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const fetchCache = "force-no-store";
export const revalidate = 0;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Adicionar produto",
  description: "Preencha o formuário para criar um novo produto.",
};

const Index = async () => {
  const token = getCookie("token");

  if (!token?.value) {
    return redirect("/sair");
  }

  const response = await getCategories(token?.value);

  if (response.status !== 200) {
    throw new Error(response.message);
  }

  const { categories } = response.data;

  return <Product action="create" categories={categories} />;
};

export default Index;
