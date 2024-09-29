import Product from "@/containers/Product";
import { getCategories } from "@/controllers/categories";
import { getProduct } from "@/controllers/products";
import { getCookie } from "@/utils/storage/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const fetchCache = "force-no-store";
export const revalidate = 0;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Editar categoria",
  description: "Preencha o formuário para editar uma categoria existente",
};

export default async function Index({ params }: { params: { id: string } }) {
  const token = getCookie("token");

  if (!token?.value) {
    return redirect("/sair");
  }

  const productId = params.id;

  const response = await getProduct({ token: token?.value, productId });

  if (response.status !== 200) {
    throw new Error(response.message);
  }

  const categoriesResponse = await getCategories(token?.value);

  if (categoriesResponse.status !== 200) {
    throw new Error(categoriesResponse.message);
  }

  const { product } = response.data;
  const { categories } = categoriesResponse.data;

  return <Product action="edit" categories={categories} product={product} />;
}
