const Advantages = () => {
  return (
    <section className="bg-[#fff] border-b py-8">
      <div className="container mx-auto flex flex-wrap pt-4 pb-12">
        <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
          Vantagens para Seu Negócio
        </h1>
        <div className="w-full mb-4">
          <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
        </div>

        <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
          <div className="flex-1 bg-[#fff] rounded-t rounded-b-none overflow-hidden shadow">
            <a
              href="#"
              className="flex flex-wrap no-underline hover:no-underline"
            >
              <p className="w-full text-gray-600 text-xs md:text-sm px-6">
                Comece Já!
              </p>
              <div className="w-full font-bold text-xl text-gray-800 px-6">
                Comece a Vender Pelo WhatsApp Hoje Mesmo
              </div>
              <p className="text-gray-800 text-base px-6 mb-5">
                Transforme o seu cardápio em um canal de vendas eficiente. Com o
                Gamou, você pode criar uma vitrine digital onde seus clientes
                podem visualizar seus pratos, bebidas e promoções, fazendo
                pedidos diretamente pelo WhatsApp. Simples e eficaz!
              </p>
            </a>
          </div>
          <div className="flex-none mt-auto bg-[#fff] rounded-b rounded-t-none overflow-hidden shadow p-6">
            <div className="flex items-center justify-start">
              <button className="mx-auto lg:mx-0 hover:underline gradient text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg">
                Começar
              </button>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
          <div className="flex-1 bg-[#fff] rounded-t rounded-b-none overflow-hidden shadow">
            <a
              href="#"
              className="flex flex-wrap no-underline hover:no-underline"
            >
              <p className="w-full text-gray-600 text-xs md:text-sm px-6">
                Comece Já!
              </p>
              <div className="w-full font-bold text-xl text-gray-800 px-6">
                Gestão Simplificada de Pedidos
              </div>
              <p className="text-gray-800 text-base px-6 mb-5">
                Com o Gamou, você gerencia todos os pedidos em um só lugar, com
                a comodidade e agilidade do WhatsApp. Otimize o seu tempo e
                garanta que seus clientes sejam atendidos de forma rápida e
                organizada.
              </p>
            </a>
          </div>
          <div className="flex-none mt-auto bg-[#fff] rounded-b rounded-t-none overflow-hidden shadow p-6">
            <div className="flex items-center justify-center">
              <button className="mx-auto lg:mx-0 hover:underline gradient text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg">
                Começar
              </button>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
          <div className="flex-1 bg-[#fff] rounded-t rounded-b-none overflow-hidden shadow">
            <a
              href="#"
              className="flex flex-wrap no-underline hover:no-underline"
            >
              <p className="w-full text-gray-600 text-xs md:text-sm px-6">
                Comece Já!
              </p>
              <div className="w-full font-bold text-xl text-gray-800 px-6">
                Aumente Suas Vendas e Fidelize Clientes
              </div>
              <p className="text-gray-800 text-base px-6 mb-5">
                O Gamou não apenas facilita a comunicação com seus clientes, mas
                também oferece ferramentas para você criar promoções e ofertas
                especiais. Assim, você pode atrair mais clientes e aumentar a
                fidelidade, tudo com poucos cliques.
              </p>
            </a>
          </div>
          <div className="flex-none mt-auto bg-[#fff] rounded-b rounded-t-none overflow-hidden shadow p-6">
            <div className="flex items-center justify-end">
              <button className="mx-auto lg:mx-0 hover:underline gradient text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg">
                Começar
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Advantages;
