"use client";

import Button from "@/components/Button";
import Heading from "@/components/Heading";
import Link from "@/components/Link";
import TextField from "@/components/TextField";
import { useAuth } from "@/hooks/use-auth";
import { useNotification } from "@/hooks/use-notification";
import { useCallback } from "react";
import Form from "../Form";

const SignUpForm = () => {
  const { signUp, loading } = useAuth();
  const { renderNotification } = useNotification();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);

      const email = (formData.get("email") || "") as string;
      const password = (formData.get("password") || "") as string;
      const passwordConfirmation = formData.get("password_confirmation") || "";

      try {
        if (email === "" || password === "" || passwordConfirmation === "") {
          throw new Error("All fields are required!");
        }

        if (password !== passwordConfirmation) {
          throw new Error("Email and Confirmation Email are not equal");
        }

        signUp(email, password);
      } catch (error: any) {
        renderNotification({ message: error.message, variant: "alert" });
      }
    },
    [signUp, renderNotification]
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
