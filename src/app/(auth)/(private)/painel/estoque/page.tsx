import Inventory from "@/containers/Inventory";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gerencia seu estoque",
  description: "Gerencie seus produtos e categorias.",
};

const Index = async () => {
  return <Inventory />;
};

export default Index;
