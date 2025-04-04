import QrCode from "@/icons/QrCode";
import Smartphone from "@/icons/Smartphone";
import Store from "@/icons/Store";
import ShoppingBag from "@/icons/ShoppingBag";
import Clock from "@/icons/Clock";
import Menu from "@/icons/Menu";
import Link from "@/components/Link";
import Image from "@/components/Image";
import Button from "@/components/Button";
import WhatsButton from "@/components/WhatsButton";
import { GAMOU_PHONE_NUMBER } from "@/utils/constants";

const MESSAGE = "Oi, quero saber mais sobre o Gamou QR Code";

export default function QRCode() {
  return (
    <div className="leading-normal tracking-normal text-white gradient">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h2 className="text-white text-medium uppercase font-bold mb-4">
            REVOLUCIONE O ATENDIMENTO NO SEU ESTABELECIMENTO
          </h2>
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Cardápio Digital com QR Code: autonomia e agilidade para seus
            clientes
          </h1>
          <p className="text-white text-large mb-8">
            Seus clientes escaneiam o QR Code, visualizam o cardápio e fazem o
            pedido direto pelo celular — sem precisar chamar o garçom.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
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
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="relative w-full max-w-md">
            <Image
              src="/img/mobile.png"
              alt="QR Code Menu Demo"
              width={400}
              height={600}
              className="rounded-lg shadow-xl"
            />
            <div className="absolute -bottom-6 right-0 bg-white p-4 rounded-lg shadow-lg">
              <QrCode className="w-16 h-16 text-primary-500" />
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="como-funciona" className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Como Funciona
            </h2>
            <p className="text-blueGray-600 text-large max-w-2xl mx-auto">
              Com poucos passos, seus clientes acessam o cardápio e fazem o
              pedido direto pelo celular
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <QrCode className="w-8 h-8" />
              </div>
              <h3 className="text-xlarge font-bold text-black mb-2">
                Cliente escaneia o QR Code
              </h3>
              <p className="text-blueGray-600">
                Posicione o QR Code nas mesas ou balcão para que o cliente possa
                acessar facilmente o cardápio.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Menu className="w-8 h-8" />
              </div>
              <h3 className="text-xlarge font-bold text-black mb-2">
                Acessa o cardápio digital
              </h3>
              <p className="text-blueGray-600">
                O cliente navega pelo cardápio digital no próprio celular, com
                fotos e informações completas.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-xlarge font-bold text-black mb-2">
                Faz o pedido pelo celular
              </h3>
              <p className="text-blueGray-600">
                O pedido é enviado diretamente pelo sistema, sem filas ou
                espera.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section
        id="vantagens"
        className="py-16 md:py-24 bg-secondary-400 bg-opacity-20"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Vantagens do Pedido por QR Code
            </h2>
            <p className="text-white text-large max-w-2xl mx-auto">
              Reduza custos com pessoal, aumente vendas e melhore a experiência
              dos seus clientes
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xlarge font-bold text-black mb-2">
                  Agilidade sem garçons
                </h3>
                <p className="text-white">
                  Reduza o tempo de espera, minimize erros de comunicação e
                  aumente a rotatividade das mesas com pedidos diretos do
                  cliente para a cozinha.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center flex-shrink-0">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xlarge font-bold text-black mb-2">
                  Cardápio sempre atualizado
                </h3>
                <p className="text-white">
                  Atualize preços, adicione novos itens ou remova produtos
                  esgotados em tempo real, sem custos de reimpressão.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center flex-shrink-0">
                <Store className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xlarge font-bold text-black mb-2">
                  Redução de custos com pessoal
                </h3>
                <p className="text-white">
                  Otimize sua equipe com uma solução que reduz a necessidade de
                  garçons, permitindo que você opere de forma mais eficiente e
                  econômica.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center flex-shrink-0">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xlarge font-bold text-black mb-2">
                  Aumento no ticket médio
                </h3>
                <p className="text-white">
                  Estudos mostram que clientes gastam em média 30% mais quando
                  fazem pedidos digitais, sem a pressão de um garçom aguardando
                  a decisão.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                Sistema completo de pedidos digitais para seu restaurante
              </h2>
              <p className="text-blueGray-600 text-large mb-8">
                Nossa solução vai além do cardápio digital, oferecendo um
                sistema completo de pedidos que elimina a necessidade de
                garçons, reduz custos e agiliza todo o processo do pedido até a
                entrega.
              </p>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-blueGray-600">
                    Pedidos diretos sem intervenção de garçons
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-blueGray-600">
                    Painel para cozinha com notificações em tempo real
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-blueGray-600">
                    Análise de vendas e comportamento do cliente
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-blueGray-600">
                    Pagamento integrado com diversas opções para o cliente
                  </span>
                </li>
              </ul>

              {/* <div className="mt-8">
                <Link
                  href="#demo"
                  className="inline-flex items-center text-primary-500 font-medium hover:text-primary-600 transition-colors"
                >
                  Ver demonstração
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div> */}
            </div>

            <div className="md:w-1/2">
              <div className="relative">
                <Image
                  src="/img/dashboard.png"
                  alt="Cardápio Digital Exemplo"
                  width={400}
                  height={600}
                  className="rounded-lg shadow-xl mx-auto"
                />
                <div className="absolute -top-4 -right-4 bg-white p-3 rounded-lg shadow-lg">
                  <QrCode className="w-12 h-12 text-primary-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary-500 to-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para eliminar filas e reduzir custos com garçons?
          </h2>
          <p className="text-large mb-8 max-w-2xl mx-auto">
            Junte-se a centenas de restaurantes, cafés e bares que já aumentaram
            seu faturamento em até 25% com nosso sistema de pedidos por QR Code.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/cadastro">
              <Button size="large" variant="secondary">
                COMEÇAR AGORA
              </Button>
            </Link>
            <WhatsButton
              variant="emerald"
              size="large"
              className="z-10 m-auto md:m-0"
              whatsapp={GAMOU_PHONE_NUMBER}
              message={MESSAGE}
            >
              CONVERSAR NO WHATS
            </WhatsButton>
          </div>
        </div>
      </section>
    </div>
  );
}
