import Category from "@/containers/Category";
import { getCategory } from "@/controllers/categories";
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

  const categoryId = params.id;

  const response = await getCategory({ token: token?.value, categoryId });

  if (response.status !== 200) {
    throw new Error(response.message);
  }

  const { category } = response.data;

  return <Category action="edit" category={category} />;
}
