import Image from '../Image';
import { GAMOU_PHONE_NUMBER } from '@/utils/constants';
import WhatsButton from '../WhatsButton';

const MESSAGE = 'Oi, quero saber mais sobre o Gamou';

const Hero = () => {
  return (
    <div className="py-24">
      <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
          <p className="uppercase tracking-loose w-full">
            Expanda sua presença digital!
          </p>
          <h1 className="my-4 text-5xl font-bold leading-tight">
            Aumente suas vendas expondo seus produtos no Gamou e receba pedidos
            via WhatsApp!
          </h1>
          <p className="leading-normal text-2xl mb-8">
            Conecte-se com seus clientes e aumente suas vendas pelo WhatsApp de
            forma simples e eficaz.
          </p>

          <WhatsButton
            variant="emerald"
            size="large"
            className="z-10 m-auto md:m-0"
            whatsapp={GAMOU_PHONE_NUMBER}
            message={MESSAGE}
          >
            Conversar no WhatsApp
          </WhatsButton>
        </div>

        <div className="w-full md:w-3/5 py-6 text-center">
          <Image
            className="w-full md:w-4/5 z-50"
            src="/img/hero.png"
            alt="Imagem de capa"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
