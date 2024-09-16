"use client";

import { useAuth } from "@/hooks/use-auth";

const ControlProfile = () => {
  const { user } = useAuth();
  console.log("user");
  console.log(user);
  return <></>;
};

export default ControlProfile;
