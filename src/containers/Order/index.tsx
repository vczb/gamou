"use client";

import Button from "@/components/Button";
import GoBackLink from "@/components/GoBackLink";
import Heading from "@/components/Heading";
import Radio from "@/components/Radio";
import TextArea from "@/components/TextArea";
import TextField from "@/components/TextField";
import { useCart } from "@/hooks/use-cart";
import { useOrder } from "@/hooks/use-order";
import WhatsApp from "@/icons/WhatsApp";
import { NoFormDataError } from "@/utils/errors";
import isMobile from "@/utils/isMobile";

type OrderProps = {
  slug: string;
};

const PHONE_NUMBER = "5551991901783";

const Order = ({ slug }: OrderProps) => {
  const { products } = useOrder();
  const { total } = useCart();

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   const data = new FormData(e.currentTarget);

  //   if (!data) {
  //     return new NoFormDataError();
  //   }

  //   let text = "";

  //   // products.forEach((product) => {
  //   // });
  //   console.log(products);

  //   const customer = data.get("name") || "";
  //   const phone = data.get("phone") || "";
  //   const deliveryMethod = data.get("delivery_method") || "";
  //   const paymentMethod = data.get("payment_method") || "";

  //   const isMobileDevice = isMobile(navigator.userAgent);

  //   // if (isMobileDevice) {
  //   //   return (window.location.href = `whatsapp://send?phone=${PHONE_NUMBER}&text=${text}`);
  //   // }

  //   // return window.open(
  //   //   `https://web.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${text}`,
  //   //   "_blank"
  //   // );
  // };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    if (!data) {
      throw new NoFormDataError();
    }

    // Collecting user input from the form
    const customer = data.get("name") || "";
    const phone = data.get("phone") || "";
    const deliveryMethod = data.get("delivery_method") || "";
    const paymentMethod = data.get("payment_method") || "";
    const orderNotes = data.get("order_notes") || "";
    const paymentNotes = data.get("payment_notes") || "";

    // Message header
    let message = `*Pedido:* #${Math.floor(Math.random() * 10000)}\n`;
    message += `Olá, gostaria de realizar um pedido com os seguintes itens:\n\n`;

    // Adding products from the array
    products.forEach((product) => {
      message += `-- ${product}\n`;
    });

    // Delivery and payment details
    message += `\n*Taxa de entrega:* A calcular\n`; // Placeholder if you need to calculate delivery dynamically
    message += `*Valor total:* R$${total}\n\n`;
    message += `*Entrega:* ${deliveryMethod}\n`;
    message += `*Entregar para:* ${customer} - ${phone}\n`;
    message += `*Forma de pagamento:* ${paymentMethod}\n`;
    if (orderNotes) message += `*Observações da entrega:* ${orderNotes}\n`;
    if (paymentNotes)
      message += `*Observações do pagamento:* ${paymentNotes}\n`;

    message += `\nPedido realizado em ${new Date().toLocaleString()} pelo WhatsApp Web.\n`;

    // Redirecting to WhatsApp
    const isMobileDevice = isMobile(navigator.userAgent);
    const encodedMessage = encodeURIComponent(message);
    if (isMobileDevice) {
      window.location.href = `whatsapp://send?phone=${PHONE_NUMBER}&text=${encodedMessage}`;
    } else {
      window.open(
        `https://web.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${encodedMessage}`,
        "_blank"
      );
    }
  };

  return (
    <main className="container mx-auto px-4 pb-28">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="my-6">
          <GoBackLink
            path={`/loja/${slug}/carrinho`}
            text="Retornar para o carrinho"
          />
        </div>
        <div className="mb-2 border-sold border-b-2 border-b-blueGray-200">
          <Heading text="Meus dados" tag="h3" />
        </div>
        <div className="flex flex-col gap-2 mb-2">
          <TextField
            placeholder="Nome*"
            name="name"
            className="w-full"
            required
          />
          <TextField placeholder="Telefone" name="phone" className="w-full" />
        </div>
        <div className="mb-2 border-sold border-b-2 border-b-blueGray-200">
          <Heading text="Forma de entrega" tag="h3" />
        </div>
        <div className="flex flex-col gap-2 mb-2">
          <Radio
            name="delivery_method"
            value="Para levar"
            label="Retirar no local"
            required
          />
          <Radio
            name="delivery_method"
            value="Entregar em casa"
            label="No meu endereço"
            required
          />
          <Radio
            name="delivery_method"
            value="Comer no local"
            label="Estou no estabelecimento"
            required
          />
        </div>
        <div className="mb-2">
          <TextArea
            className="w-full"
            placeholder="Observações da entrega..."
            name="order_notes"
          />
        </div>
        <div className="mb-2 border-sold border-b-2 border-b-blueGray-200">
          <Heading text="Forma de pagamento" tag="h3" />
        </div>
        <div className="flex flex-col gap-2 mb-2">
          <Radio name="payment_method" value="Cartão" label="Cartão" required />
          <Radio
            name="payment_method"
            value="Dinheiro"
            label="Dinheiro"
            required
          />
          <Radio name="payment_method" value="Outro" label="Outro" required />
        </div>
        <div className="mb-2">
          <TextArea
            className="w-full"
            placeholder="Observações do pagamento..."
            name="payment_notes"
          />
        </div>
        <div className="mt-8 text-end">
          <div className="flex justify-end">
            <Heading text={`Total:`} tag="h3" className="mr-2" />
            <Heading
              text={`R$ ${total}`}
              tag="h3"
              className="text-primary-600"
            />
          </div>
          <i className="text-xs text-blueGray-600">
            Valor de entrega não encluso, consultar após submeter o pedido
          </i>
        </div>
        <div className="mt-8">
          <Button className="w-full text-xlarge flex items-center justify-center">
            <span className="mr-2 text-black">Enviar pedido</span>
            <WhatsApp height={24} />
          </Button>
        </div>
      </form>
    </main>
  );
};

export default Order;
