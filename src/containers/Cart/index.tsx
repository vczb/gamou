"use client";

import { useCallback } from "react";
import Button from "@/components/Button";
import CartItemList from "@/components/CartItemList";
import Heading from "@/components/Heading";
import TextArea from "@/components/TextArea";
import { useCart } from "@/hooks/use-cart";
import { useOrder } from "@/hooks/use-order";
import { useRouter } from "next/navigation";
import GoBackLink from "@/components/GoBackLink";

type CartProps = {
  slug: string;
};
export default function Cart({ slug }: CartProps) {
  const { items, total } = useCart();
  const { saveProducts, saveCartNotes, cartNotes } = useOrder();
  const router = useRouter();

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const data = new FormData(e.currentTarget);

      if (!data) {
        return new Error("Não foi possível processar o formulário");
      }

      const products = data.getAll("product") || [];
      const notes = data.get("notes") || "";

      if (!products.length) {
        throw new Error("Não há produtos no carrinho");
      }

      saveProducts(products as string[]);

      saveCartNotes(notes as string);

      router.push(`/${slug}/pedido`);
    },
    [saveProducts, saveCartNotes, router, slug]
  );

  return (
    <main className="container mx-auto px-4 pb-28">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="my-6">
          <GoBackLink path={`/${slug}`} text="Retornar para a loja" />
        </div>
        <div className="mb-2 border-sold border-b-2 border-b-blueGray-200">
          <Heading text="Revise seu pedido" tag="h1" />
        </div>
        <div>
          {items.length ? (
            <CartItemList items={items} />
          ) : (
            <div>
              <p className="text-blueGray-600">Seu carrinho está vazio</p>
            </div>
          )}
        </div>
        <div className="flex mt-8 justify-end">
          <Heading text={`Total:`} tag="h3" className="mr-2" />
          <Heading text={`R$ ${total}`} tag="h3" className="text-primary-600" />
        </div>

        <div className="mt-8">
          <Heading text="Observações do pedido" tag="h3" />
        </div>
        <div className="mb-2">
          <TextArea
            className="w-full"
            placeholder="Digite aqui..."
            name="notes"
            defaultValue={cartNotes}
          />
        </div>
        <div className="mt-8">
          <Button className="w-full text-xlarge" disabled={!items.length}>
            Avançar
          </Button>
        </div>
      </form>
    </main>
  );
}
