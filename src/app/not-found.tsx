import Button from "@/components/Button";
import Link from "@/components/Link";

export default function NotFound() {
  return (
    <>
      <title>404: Página não encontrada</title>
      <meta
        name="description"
        content="Oops! A página que você está procurando não existe ou foi movida."
      ></meta>
      <meta name="robots" content="noindex, nofollow"></meta>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="space-y-4">
            <h1 className="text-9xl font-extrabold text-primary-600 animate-pulse">
              404
            </h1>
            <h2 className="text-4xl font-bold text-black mt-8">
              Página não encontrada
            </h2>
            <p className="text-xl text-blueGray-600 mt-4">
              Oops! A página que você está procurando não existe ou foi movida.
            </p>
          </div>
          <div className="mt-10">
            <Link href="/">
              <Button size="large">Voltar à página inicial</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
