import Categories from "@/containers/Categories";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gerencia suas categorias",
  description: "Adicione, edite ou exclua suas categorias.",
};

const Index = async () => {
  return <Categories />;
};

export default Index;
