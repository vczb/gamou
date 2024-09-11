"use client";

import Button from "@/components/Button";
import Heading from "@/components/Heading";
import Link from "@/components/Link";
import TextField from "@/components/TextField";
import { useAuth } from "@/hooks/use-auth";
import { useCallback } from "react";
import Form from "../Form";
import renderFlashMessage from "@/utils/renderFlashMessage";

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
    <Form id="sign-up" onSubmit={handleSubmit}>
      <Heading text="Cadastre-se" />
      <label className="flex flex-col">
        <b className="text-black">Email:</b>
        <TextField name="email" type="email" placeholder="Digite seu email" />
      </label>
      <label className="flex flex-col">
        <b className="text-black">Senha:</b>
        <TextField
          name="password"
          type="password"
          placeholder="Digite sua senha"
        />
        <TextField
          name="password_confirmation"
          type="password"
          placeholder="Confirme sua senha"
          className="mt-2"
        />
      </label>
      <Button disabled={loading}>
        {loading ? "Carregando..." : "Criar conta"}
      </Button>
      <Link href="/entrar" className="ml-auto text-blueGray-600">
        Já tenho uma conta
      </Link>
    </Form>
  );
};

export default SignUpForm;
