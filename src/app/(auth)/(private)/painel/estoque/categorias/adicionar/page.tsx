import Category from "@/containers/Category";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nova categoria",
  description: "Preencha o formuário para criar uma nova categoria.",
};

const Index = async () => {
  return <Category action="create" />;
};

export default Index;
