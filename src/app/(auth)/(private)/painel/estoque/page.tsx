import Inventory from "@/containers/Inventory";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gerencia suas categorias",
  description: "Gerencie seus dados e produtos.",
};

const Index = async () => {
  return <Inventory />;
};

export default Index;
