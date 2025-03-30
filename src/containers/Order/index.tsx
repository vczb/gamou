'use client';

import Button from '@/components/Button';
import GoBackLink from '@/components/GoBackLink';
import Heading from '@/components/Heading';
import Radio from '@/components/Radio';
import TextArea from '@/components/TextArea';
import TextField from '@/components/TextField';
import { useCart } from '@/hooks/use-cart';
import { useOrder } from '@/hooks/use-order';
import WhatsApp from '@/icons/WhatsApp';
import { Order as OrderTypes, PaymentMethod } from '@/types/order';
import { PAYMENT_METHOD } from '@/utils/constants';
import sendWhatsApp from '@/utils/sendWhatsApp';
import { useCallback } from 'react';

type OrderProps = {
  slug: string;
  whatsapp: string;
  companyId: string | number;
};

const Order = ({ slug, whatsapp, companyId }: OrderProps) => {
  const { products, cartNotes, createOrder } = useOrder();
  const { total, items } = useCart();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const data = new FormData(e.currentTarget);

      if (!data) {
        throw new Error('Não foi possível processar o formulário');
      }

      const now = new Date().toLocaleString('pt-BR', {
        hour12: false,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });

      const id = now.replace(/\D/g, '');

      const customer = data.get('name') || '';
      const address = data.get('address') || '';
      const paymentMethod = (data.get('payment_method') || '') as PaymentMethod;
      const orderNotes = data.get('order_notes') || '';

      let message = `*Pedido:* #${id}\n\n`;
      message += `Olá, gostaria de realizar um pedido com os seguintes produtos:\n\n`;

      products.forEach((product, idx) => {
        message += `${idx + 1}) ${product}\n\n`;
      });

      message += `*Valor dos produtos:* R$${total}\n`;
      message += `*Taxa de entrega:* A calcular\n\n`;

      message += `*Entregar para:* ${customer}\n`;
      message += `*Endereço:* ${address}\n`;
      message += `*Forma de pagamento:* ${PAYMENT_METHOD[paymentMethod]}\n`;

      if (cartNotes) {
        message += `*Observações do carrinho:* ${cartNotes}\n`;
      }

      if (orderNotes) {
        message += `*Observações do pedido:* ${orderNotes}\n`;
      }

      message += `\nPedido realizado em ${now} pelo Gamou Pedidos.\n`;

      const order = {
        customer_name: customer,
        address: address,
        items,
        total,
        payment_method: paymentMethod,
        order_notes: orderNotes,
        cart_notes: cartNotes,
        company_id: companyId,
        summary: message,
      } as OrderTypes;

      await createOrder(order);

      sendWhatsApp(whatsapp, message);
    },
    [cartNotes, products, total, whatsapp, createOrder, companyId, items]
  );

  return (
    <main className="container mx-auto px-4 pb-28">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="my-6">
          <GoBackLink
            path={`/${slug}/carrinho`}
            text="Retornar para o carrinho"
          />
        </div>
        <div className="mb-2 border-sold border-b-2 border-b-blueGray-200">
          <Heading text="Meus dados" tag="h3" />
        </div>
        <div className="flex flex-col gap-2 mb-2">
          <TextField
            placeholder="Nome"
            name="name"
            className="w-full"
            // required
          />
          <TextField
            placeholder="Endereço"
            name="address"
            className="w-full"
            // required
          />
        </div>

        <div className="mb-2 border-sold border-b-2 border-b-blueGray-200">
          <Heading text="Forma de pagamento" tag="h3" />
        </div>
        <div className="flex flex-col gap-2 mb-2">
          <Radio
            name="payment_method"
            value="credit_card"
            label="Cartão de Crédito"
          />
          <Radio
            name="payment_method"
            value="debit_card"
            label="Cartão de Débito"
          />
          <Radio name="payment_method" value="cash" label="Dinheiro" />
          <Radio name="payment_method" value="pix" label="Pix" defaultChecked />
          <Radio name="payment_method" value="other" label="Outro" />
        </div>

        <div className="mb-2 border-sold border-b-2 border-b-blueGray-200">
          <Heading text="Observações" tag="h3" />
        </div>
        <div className="mb-2">
          <TextArea
            className="w-full"
            placeholder="Escreva aqui se houver..."
            name="order_notes"
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
            variant="emerald"
          >
            <span className="mr-2 ">Enviar pedido</span>
            <WhatsApp height={24} />
          </Button>
        </div>
      </form>
    </main>
  );
};

export default Order;
