import Profile from "@/containers/Profile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gerencie seus dados",
  description: "Gerencie seus dados e produtos.",
};

const Index = async () => {
  return <Profile />;
};

export default Index;
