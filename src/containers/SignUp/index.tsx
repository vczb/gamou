import Button from "@/components/Button";
import Heading from "@/components/Heading";
import Link from "@/components/Link";
import TextField from "@/components/TextField";

const SignUp = () => {
  return (
    <main className="container px-4 pb-28 min-h-screen flex items-center justify-center">
      <form className="shadow-lg border-sold border-2 border-b-blueGray-200 p-6 flex flex-col mx-auto  gap-2 w-full max-w-lg">
        <Heading text="Cadastre-se" />
        <label className="flex flex-col">
          <b>Email:</b>
          <TextField type="email" placeholder="Digite seu email" />
        </label>
        <label className="flex flex-col">
          <b>Senha:</b>
          <TextField type="password" placeholder="Digite sua senha" />
          <TextField
            type="password"
            placeholder="Confirme sua senha"
            className="mt-2"
          />
        </label>
        <Button>Criar conta</Button>
        <Link href="/entrar" className="ml-auto text-blueGray-600">
          Já tenho uma conta
        </Link>
      </form>
    </main>
  );
};

export default SignUp;
