"use client";

import Button from "@/components/Button";
import Heading from "@/components/Heading";
import Link from "@/components/Link";
import TextField from "@/components/TextField";
import { useAuth } from "@/hooks/use-auth";
import { useCallback } from "react";

const SignUp = () => {
  const { signUp, loading } = useAuth();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);

      const email = (formData.get("email") || "") as string;
      const password = (formData.get("password") || "") as string;
      const passwordConfirmation = formData.get("password_confirmation") || "";

      if (email === "" || password === "" || passwordConfirmation === "") {
        // TODO: show error message
        return;
      }

      if (password !== passwordConfirmation) {
        // TODO: show error message
        return;
      }

      signUp(email, password);
    },
    [signUp]
  );

  return (
    <main className="container px-4 pb-28 min-h-screen flex items-center justify-center">
      <form
        className="shadow-lg border-sold border-2 border-b-blueGray-200 p-6 flex flex-col mx-auto  gap-2 w-full max-w-lg"
        onSubmit={handleSubmit}
      >
        <Heading text="Cadastre-se" />
        <label className="flex flex-col">
          <b>Email:</b>
          <TextField name="email" type="email" placeholder="Digite seu email" />
        </label>
        <label className="flex flex-col">
          <b>Senha:</b>
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
      </form>
    </main>
  );
};

export default SignUp;
