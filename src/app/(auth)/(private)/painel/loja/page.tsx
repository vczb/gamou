import Company from "@/containers/Company";
import { CompanyController } from "@/controllers/CompanyController";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gerencie sua loja",
  description:
    "Edite informações sobre sua loja, ative para ter seu site online",
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
