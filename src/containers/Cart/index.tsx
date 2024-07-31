"use client";

import { useCallback } from "react";
import Button from "@/components/Button";
import CartItemList from "@/components/CartItemList";
import Heading from "@/components/Heading";
import Link from "@/components/Link";
import TextArea from "@/components/TextArea";
import { useCart } from "@/hooks/use-cart";
import { useOrder } from "@/hooks/use-order";
import Arrow from "@/icons/Arrow";

import { useRouter } from "next/navigation";

type CartProps = {
  slug: string;
};
export default function Cart({ slug }: CartProps) {
  const { items, total } = useCart();
  const { saveProducts, saveCartNotes } = useOrder();
  const router = useRouter();

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const data = new FormData(e.currentTarget);

      if (!data) {
        return;
      }

      const products = data.getAll("product");
      const notes = data.get("notes");

      if (products.length) {
        saveProducts(products as string[]);
      }
      if (notes) {
        saveCartNotes(notes as string);
      }

      router.push(`/loja/${slug}/pedido`);
    },
    [saveProducts, saveCartNotes, router, slug]
  );

  return (
    <main className="container mx-auto px-4 pb-28">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="my-6">
          <Link href={`/loja/${slug}`} className="flex items-center">
            <Arrow className="h-6 rotate-180 mr-3" />
            <b className="text-primary-600 ">Retornar para a loja</b>
          </Link>
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
