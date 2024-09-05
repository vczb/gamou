import { Metadata } from "next";
import Control from "@/containers/Control";

export const metadata: Metadata = {
  title: "Painel de Controle",
  description: "Gerencie seus dados e produtos.",
};

const Index = async () => {
  return <Control />;
};

export default Index;
