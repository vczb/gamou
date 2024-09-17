"use client";

import Breadcrumb from "@/components/Breadcrumb";
import Button from "@/components/Button";
import DynamicForm, { FieldFormSchema } from "@/components/DynamicForm";
import { useUser } from "@/hooks/use-user";
import { User } from "@/types/user";
import renderFlashMessage from "@/utils/renderFlashMessage";
import { useCallback, useMemo } from "react";

const BREADCUMB = [
  { link: "/painel", label: "Painel" },
  { link: "/painel/eu", label: "Eu", active: true },
];

type ProfileProps = {
  user: User;
};

const Profile = ({ user }: ProfileProps) => {
  const { editUser, loading } = useUser();

  const formData = useMemo(() => {
    return [
      {
        name: "email",
        label: "Email:",
        type: "paragraph",
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
        disabled: loading,
      },
    ] as unknown as FieldFormSchema[];
  }, [user, loading]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);

      const name = (formData.get("name") || "") as string;
      const password = (formData.get("password") || "") as string;

      try {
        await editUser({ name, password });

        renderFlashMessage({
          message: "Usuário atualizado com sucesso!",
          variant: "success",
        });
      } catch (error: any) {
        renderFlashMessage({ message: error.message, variant: "alert" });
      }
    },
    [editUser]
  );

  return (
    <div className="container mx-auto px-4 pb-28 pt-8 max-w-lg">
      <Breadcrumb items={BREADCUMB} />
      <div className="mt-4">
        <DynamicForm
          formId="profile-form"
          schema={formData}
          onSubmit={handleSubmit}
          btnProps={{
            text: loading ? "Salvando..." : "Atualizar dados",
            variant: "secondary",
            disabled: loading,
          }}
        />
      </div>
    </div>
  );
};

export default Profile;
