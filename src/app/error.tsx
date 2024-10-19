"use client";

import Button from "@/components/Button";
import Link from "@/components/Link";

export default function ServerError() {
  return (
    <>
      <title>500: Erro do Servidor</title>
      <meta
        name="description"
        content="Ocorreu um erro no servidor. Nossa equipe técnica foi notificada e
          está trabalhando para resolver o problema."
      ></meta>
      <meta name="robots" content="noindex, nofollow"></meta>
      <div className="min-h-screen bg-white flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <h1 className="mt-6 text-huge font-bold text-black">
            Erro do Servidor
          </h1>
          <p className="mt-2 text-medium text-blueGray-600">
            Ocorreu um erro no servidor. Nossa equipe técnica foi notificada e
            está trabalhando para resolver o problema.
          </p>
          <div className="mt-5">
            <Link href="/">
              <Button>Voltar à página inicial</Button>
            </Link>
          </div>
          <p className="mt-6 text-small text-blueGray-400">
            Se o problema persistir, entre em contato com o suporte técnico.
          </p>
        </div>
      </div>
    </>
  );
}
