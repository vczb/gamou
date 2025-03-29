import SignUp from "@/containers/SignUp";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Criar Novo Usuário - Gamou",
  description:
    "Crie sua conta no Gamou Pedidos e comece a vender pelo WhatsApp agora mesmo!",
};

const Index = () => {
  return <SignUp />;
};

export default Index;
