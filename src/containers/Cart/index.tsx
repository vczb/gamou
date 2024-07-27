import CartButton from "@/components/CartButton";
import CartItemList from "@/components/CartItemList";
import Link from "@/components/Link";
import Arrow from "@/icons/Arrow";

type CartProps = {
  slug: string;
};
export default function Cart({ slug }: CartProps) {
  return (
    <main className="container mx-auto px-4 pb-28">
      <div className="my-6">
        <Link href={`/loja/${slug}`} className="flex items-center">
          <Arrow className="h-6 rotate-180 mr-3" />
          <b className="text-primary-600 ">Retornar para a loja</b>
        </Link>
      </div>
      <CartItemList />
      <CartButton />
    </main>
  );
}
