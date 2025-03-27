import Button from '../Button';

const Pricing = () => {
  return (
    <section className="bg-gray-100 py-8" id="precos-e-planos">
      <div className="container mx-auto px-2 pt-4 pb-12 text-gray-800">
        <h2 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
          Planos e Preços
        </h2>
        <div className="w-full mb-4">
          <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center pt-12 my-12 sm:my-4">
          {/* Plano Gratuito */}
          <div className="flex flex-col w-5/6 lg:w-1/4 mx-auto lg:mx-0 rounded-none lg:rounded-l-lg bg-[#fff] mt-4">
            <div className="flex-1 bg-[#fff] text-gray-600 rounded-t rounded-b-none overflow-hidden shadow">
              <div className="p-8 text-3xl font-bold text-center border-b-4">
                Gratuito
              </div>
              <ul className="w-full text-center text-sm">
                <li className="border-b py-4">Até 50 produtos</li>
                <li className="border-b py-4">10 Categoria</li>
                <li className="border-b py-4">Suporte via Email</li>
              </ul>
            </div>
            <div className="flex-none mt-auto bg-[#fff] rounded-b rounded-t-none overflow-hidden shadow p-6">
              <div className="w-full pt-6 text-3xl text-gray-600 font-bold text-center">
                R$ 0 <span className="text-base">por mês</span>
              </div>
              <div className="flex items-center justify-center">
                {/* <Button variant="gradient" className="my-6">
                  Comece Agora
                </Button> */}
              </div>
            </div>
          </div>

          {/* Plano Básico */}
          <div className="flex flex-col w-5/6 lg:w-1/3 mx-auto lg:mx-0 rounded-lg bg-[#fff] mt-4 sm:-mt-6 shadow-lg z-10">
            <div className="flex-1 bg-[#fff] rounded-t rounded-b-none overflow-hidden shadow">
              <div className="w-full p-8 text-3xl font-bold text-center">
                Básico
              </div>
              <div className="h-1 w-full gradient my-0 py-0 rounded-t"></div>
              <ul className="w-full text-center text-base font-bold">
                <li className="border-b py-4">Até 100 produtos</li>
                <li className="border-b py-4">20 Categorias</li>
                <li className="border-b py-4">Suporte via Email e WhatsApp</li>
                <li className="border-b py-4">Relatórios Básicos</li>
              </ul>
            </div>
            <div className="flex-none mt-auto bg-[#fff] rounded-b rounded-t-none overflow-hidden shadow p-6">
              <div className="w-full pt-6 text-4xl font-bold text-center">
                R$ 50 <span className="text-base">por mês</span>
              </div>
              <div className="flex items-center justify-center">
                {/* <Button variant="gradient" className="my-6">
                  Comece Agora
                </Button> */}
              </div>
            </div>
          </div>

          {/* Plano Pro */}
          <div className="flex flex-col w-5/6 lg:w-1/4 mx-auto lg:mx-0 rounded-none lg:rounded-l-lg bg-[#fff] mt-4">
            <div className="flex-1 bg-[#fff] text-gray-600 rounded-t rounded-b-none overflow-hidden shadow">
              <div className="p-8 text-3xl font-bold text-center border-b-4">
                Pro
              </div>
              <ul className="w-full text-center text-sm">
                <li className="border-b py-4">Produtos Ilimitados</li>
                <li className="border-b py-4">Categorias Ilimitadas</li>
                <li className="border-b py-4">Suporte Prioritário</li>
                <li className="border-b py-4">Relatórios Avançados</li>
              </ul>
            </div>
            <div className="flex-none mt-auto bg-[#fff] rounded-b rounded-t-none overflow-hidden shadow p-6">
              <div className="w-full pt-6 text-3xl text-gray-600 font-bold text-center">
                R$ 100 <span className="text-base">por mês</span>
              </div>
              <div className="flex items-center justify-center">
                {/* <Button variant="gradient" className="my-6">
                  Comece Agora
                </Button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
