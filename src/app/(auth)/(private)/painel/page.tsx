import { Metadata } from "next";
import Control from "@/containers/Control";

export const metadata: Metadata = {
  title: "Painel de Controle",
  description:
    "Aqui você tem informações sobre seu perfil, plano tem o controle sua loja e inventório",
};

const Index = async () => {
  return <Control />;
};

export default Index;
