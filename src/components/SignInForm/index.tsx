"use client";

import { useCallback } from "react";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import Link from "@/components/Link";
import TextField from "@/components/TextField";
import { useAuth } from "@/hooks/use-auth";
import Form from "../Form";
import renderFlashMessage from "@/utils/renderFlashMessage";

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
    <Form id="sign-in" onSubmit={handleSubmit}>
      <Heading text="Entrar" />
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
      </label>
      <Button disabled={loading}>{loading ? "Carregando" : "Confirmar"}</Button>
      <Link href="/cadastro" className="ml-auto text-blueGray-600">
        Cadastrar-se
      </Link>
    </Form>
  );
};

export default SignInForm;
