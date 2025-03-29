import SignIn from "@/containers/SignIn";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Entrar no Gamou",
  description: "Digite seus dados para acessar o sistema.",
};

const Index = async () => {
  return <SignIn />;
};

export default Index;
