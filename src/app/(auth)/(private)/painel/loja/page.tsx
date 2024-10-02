import Company from "@/containers/Company";
import { CompanyController } from "@/controllers/CompanyController";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gerencie seus pedidos",
  description: "Gerencie seus dados e produtos.",
};

const Index = async () => {
  const controller = new CompanyController();

  const response = await controller.selectFirstCompanyByToken();

  if (response.status !== 200) {
    throw new Error(response.message);
  }

  const { company } = response.data;

  return <Company company={company} />;
};

export default Index;
