import SignIn from "@/containers/SignIn";
import { tetsConnection } from "@/models/users";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Entrar no Gamou",
  description: "Digite seus dados para acessar o sistema.",
};

const Index = async () => {
  await tetsConnection();

  return <SignIn />;
};

export default Index;
