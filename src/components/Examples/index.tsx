import Heading from '../Heading';
import Image from '../Image';
import Link from '../Link';

const DATA = [
  {
    image: '/img/examples/restaurant.webp',
    title: 'Exemplo Restaurante',
    path: '/exemplo-restaurante',
  },

  {
    image: '/img/examples/beach-shop.webp',
    title: 'Exemplo Quiosque',
    path: '/exemplo-quiosque',
  },
];

const Examples = () => {
  return (
    <section className="bg-white border-b p-12" id="exemplos">
      <div className="container max-w-5xl mx-auto mb-8">
        <h2 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
          Exemplos de lojas
        </h2>
        <div className="w-full mb-8">
          <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {DATA.map((site) => (
            <div
              key={site.title}
              className=" border-gray-500 flex flex-col w-full h-full"
            >
              <b className="text-black text-xl">{site.title}</b>
              <Link
                href={site.path}
                className="relative w-full h-48 md:h-96 overflow-hidden shadow-sm hover:shadow-lg rounded"
                target="_blank"
              >
                <Image
                  src={site.image}
                  alt={site.title}
                  className="hover:scale-105 absolute left-0 right-0 top-0 bottom-0 transition-all w-full h-full"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Examples;
