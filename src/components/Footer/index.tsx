import Diamond from '@/icons/Diamond';

const Footer = () => {
  return (
    <footer className="bg-[#fff]">
      <div className="container mx-auto px-8">
        <div className="w-full flex flex-col md:flex-row items-center justify-between py-6">
          <div className="flex-1 text-center md:text-left mb-6 md:mb-0">
            <a
              className="text-orange-600 no-underline hover:no-underline font-bold text-2xl lg:text-4xl flex items-center justify-center md:justify-start"
              href="/"
            >
              <Diamond className="h-8 fill-current inline" />
              <span className="ml-2">Gamou</span>
            </a>
          </div>

          <div className="text-center text-gray-600">
            &copy; {new Date().getFullYear()} Gamou. Todos os direitos
            reservados.
          </div>

          {/* Mantendo este bloco comentado como exemplo futuro */}
          {/* <div className="flex-1">
            <p className="uppercase text-gray-500 md:mb-6">Links</p>
            <ul className="list-reset mb-6">
              <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                <a
                  href="#"
                  className="no-underline hover:underline text-gray-800 hover:text-orange-500"
                >
                  FAQ
                </a>
              </li>
              <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                <a
                  href="#"
                  className="no-underline hover:underline text-gray-800 hover:text-orange-500"
                >
                  Suporte
                </a>
              </li>
            </ul>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
