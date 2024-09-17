"use client";

import { useAuth } from "@/hooks/use-auth";
import { useCallback } from "react";
import renderFlashMessage from "@/utils/renderFlashMessage";
import DynamicForm, { FieldFormSchema } from "../DynamicForm";

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
  {
    name: "password_confirmation",
    type: "password",
    required: true,
    placeholder: "Confirme sua senha",
  },
] as unknown as FieldFormSchema[];

const SignUpForm = () => {
  const { signUp, loading } = useAuth();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);

      const email = (formData.get("email") || "") as string;
      const password = (formData.get("password") || "") as string;
      const passwordConfirmation = formData.get("password_confirmation") || "";

      try {
        if (email === "" || password === "" || passwordConfirmation === "") {
          throw new Error("Você deve preencher todos os campos!");
        }

        if (password !== passwordConfirmation) {
          throw new Error("Senha e confirmação de senha devem ser iguais!");
        }

        await signUp(email, password);
      } catch (error: any) {
        const message =
          error.message ||
          "Não foi possivel realizar o cadastro. Tente novamente mais tarde.";
        renderFlashMessage({ message: message, variant: "alert" });
      }
    },
    [signUp]
  );

  return (
    <DynamicForm
      formId="sign-up"
      headingText="Cadastre-se"
      onSubmit={handleSubmit}
      schema={FORM_SCHEMA}
      btnProps={{
        disabled: loading,
        text: loading ? "Carregando..." : "Criar conta",
      }}
      linkProps={{
        text: "Já tenho uma conta",
        target: "/entrar",
      }}
    />
  );
};

export default SignUpForm;
