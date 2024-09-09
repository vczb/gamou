"use client";

import { useCallback } from "react";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import Link from "@/components/Link";
import TextField from "@/components/TextField";
import { useAuth } from "@/hooks/use-auth";

const SignInForm = () => {
  const { signIn, loading } = useAuth();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);

      const email = (formData.get("email") || "") as string;
      const password = (formData.get("password") || "") as string;

      if (email === "" || password === "") {
        // TODO: show error message
        return;
      }

      signIn(email, password);
    },
    [signIn]
  );
  return (
    <form
      className="shadow-lg border-sold border-2  bg-white border-b-blueGray-200 p-6 flex flex-col mx-auto  gap-2 w-full max-w-lg"
      onSubmit={handleSubmit}
    >
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
      <Button>Confirmar</Button>
      <Link href="/cadastro" className="ml-auto text-blueGray-600">
        Cadastrar-se
      </Link>
    </form>
  );
};

export default SignInForm;
