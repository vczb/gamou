"use client";

import Breadcrumb from "@/components/Breadcrumb";
import DynamicForm, { FieldFormSchema } from "@/components/DynamicForm";
import { User } from "@/types/user";
import { useMemo } from "react";

const BREADCUMB = [
  { link: "/painel", label: "Painel" },
  { link: "/painel/eu", label: "Eu", active: true },
];

type ProfileProps = {
  user: User;
};

const Profile = ({ user }: ProfileProps) => {
  const formData = useMemo(() => {
    return [
      {
        name: "email",
        label: "Email:",
        type: "email",
        defaultValue: user.email,
        editable: false,
        required: true,
      },
      {
        name: "name",
        label: "Nome:",
        placeholder: "Digite seu nome",
        type: "text",
        defaultValue: user.name,
        editable: true,
        required: true,
      },
    ] as unknown as FieldFormSchema[];
  }, [user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {};

  return (
    <div className="container mx-auto px-4 pb-28 pt-8">
      <Breadcrumb items={BREADCUMB} />
      <div className="mt-4">
        <DynamicForm
          formId="profile-form"
          schema={formData}
          onSubmit={handleSubmit}
          btnProps={{
            text: "Atualizar dados",
          }}
          linkProps={{
            text: "Deletar",
            target: "#deletar",
          }}
        />
      </div>
    </div>
  );
};

export default Profile;
