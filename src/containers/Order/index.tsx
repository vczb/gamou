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
import { GAMOU_PHONE_NUMBER } from "@/utils/constants";
import { NoFormDataError } from "@/utils/errors";
import sendWhatsApp from "@/utils/sendWhatsApp";
import { useCallback } from "react";

type OrderProps = {
  slug: string;
};

const Order = ({ slug }: OrderProps) => {
  const { products, cartNotes } = useOrder();
  const { total } = useCart();

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const data = new FormData(e.currentTarget);

      if (!data) {
        throw new NoFormDataError();
      }

      // Collecting user input from the form
      const customer = data.get("name") || "";
      const phone = data.get("phone") || "";
      const address = data.get("address") || "";
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
      message += `*Entregar para:* ${customer}\n`;
      message += `*Telefone:* ${phone}\n`;
      message += `*Endereço:* ${address}\n`;
      message += `*Forma de pagamento:* ${paymentMethod}\n`;

      if (cartNotes) {
        message += `*Observações do carrinho:* ${cartNotes}\n`;
      }

      if (orderNotes) {
        message += `*Observações da entrega:* ${orderNotes}\n`;
      }
      if (paymentNotes) {
        message += `*Observações do pagamento:* ${paymentNotes}\n`;
      }

      message += `\nPedido realizado em ${new Date().toLocaleString()} pelo Gamou Pedidos.\n`;

      sendWhatsApp(GAMOU_PHONE_NUMBER, message);
    },
    [cartNotes, products, total]
  );

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
            // required
          />
          <TextField placeholder="Telefone" name="phone" className="w-full" />
          <TextField
            placeholder="Endereço*"
            name="address"
            className="w-full"
            // required
          />
        </div>
        {/* <div className="mb-2 border-sold border-b-2 border-b-blueGray-200">
          <Heading text="Forma de entrega" tag="h3" />
        </div> */}
        {/* <div className="flex flex-col gap-2 mb-2">
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
        </div> */}
        <div className="mb-2">
          <TextArea
            className="w-full"
            placeholder="Observações..."
            name="order_notes"
          />
        </div>
        <div className="mb-2 border-sold border-b-2 border-b-blueGray-200">
          <Heading text="Forma de pagamento" tag="h3" />
        </div>
        <div className="flex flex-col gap-2 mb-2">
          <Radio name="payment_method" value="Cartão" label="Cartão" checked />
          <Radio name="payment_method" value="Dinheiro" label="Dinheiro" />
          <Radio name="payment_method" value="Outro" label="Outro" />
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
          <Button
            className="w-full text-xlarge flex items-center justify-center"
            variant="emeraldMint"
          >
            <span className="mr-2 text-black">Enviar pedido</span>
            <WhatsApp height={24} />
          </Button>
        </div>
      </form>
    </main>
  );
};

export default Order;
