"use client";

import { useCallback } from "react";
import renderFlashMessage from "@/utils/renderFlashMessage";
import DynamicForm, { FieldFormSchema } from "../DynamicForm";
import { useAuth } from "@/hooks/use-auth";

const FORM_SCHEMA = [
  {
    name: "email",
    label: "Email:",
    type: "email",
    placeholder: "Digite seu email",
    required: true,
  },
  {
    name: "password",
    label: "Senha:",
    type: "password",
    required: true,
    placeholder: "Digite sua senha",
  },
] as unknown as FieldFormSchema[];

const SignInForm = () => {
  const { signIn, loading } = useAuth();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);

      const email = (formData.get("email") || "") as string;
      const password = (formData.get("password") || "") as string;

      try {
        if (email === "" || password === "") {
          throw new Error("Email e senha são obrigatórios!");
        }

        signIn(email, password);
      } catch (error: any) {
        renderFlashMessage({ message: error.message, variant: "alert" });
      }
    },
    [signIn]
  );

  return (
    <DynamicForm
      headingText="Entrar"
      formId="sign-in"
      onSubmit={handleSubmit}
      schema={FORM_SCHEMA}
      btnProps={{
        disabled: loading,
        text: loading ? "Carregando..." : "Confirmar",
      }}
      linkProps={{
        text: "Cadastrar-se",
        target: "/cadastro",
      }}
    />
  );
};

export default SignInForm;
