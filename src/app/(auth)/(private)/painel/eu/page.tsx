import Profile from "@/containers/Profile";
import { UserController } from "@/controllers/UserController";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gerencie seus dados",
  description: "Gerencie seus dados e produtos.",
};

const Index = async () => {
  const controller = new UserController();

  const response = await controller.selectUserByToken();

  if (response.status !== 200) {
    throw new Error(response.message);
  }

  const { user } = response.data;

  return <Profile user={user} />;
};

export default Index;
