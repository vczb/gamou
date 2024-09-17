import Profile from "@/containers/Profile";
import { getUser } from "@/controllers/users";
import { User } from "@/types/user";
import { getCookie } from "@/utils/storage/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Gerencie seus dados",
  description: "Gerencie seus dados e produtos.",
};

const Index = async () => {
  const token = getCookie("token");

  if (!token?.value) {
    return redirect("/sair");
  }

  const response = await getUser(token?.value);

  if (response.status !== 200) {
    throw new Error(response.message);
  }

  const { user } = response.data;

  return <Profile user={user} />;
};

export default Index;
