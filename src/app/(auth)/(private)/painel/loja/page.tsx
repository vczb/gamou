import Company from "@/containers/Company";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gerencie seus pedidos",
  description: "Gerencie seus dados e produtos.",
};

const Index = async () => {
  return <Company />;
};

export default Index;
