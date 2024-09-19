import Company from "@/containers/Company";
import { getCompany } from "@/controllers/companies";
import { getCookie } from "@/utils/storage/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Gerencie seus pedidos",
  description: "Gerencie seus dados e produtos.",
};

const Index = async () => {
  const token = getCookie("token");

  if (!token?.value) {
    return redirect("/sair");
  }

  const response = await getCompany(token?.value);

  if (response.status !== 200) {
    throw new Error(response.message);
  }

  const { company } = response.data;

  return <Company company={company} />;
};

export default Index;
