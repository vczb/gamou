import { CURRENCY } from "@/utils/constants";
import Image from "../Image";
import { Product } from "@/types/product";
import Button from "../Button";

export type ProductManagerProps = Product;

const ProductManager = (product: ProductManagerProps) => {
  const { title, image, description, price, id, amount } = product;
  return (
    <div id={String(id)} className="grid gap-2 grid-cols-3">
      <Image src={image} alt={title} className="w-full h-auto object-cover" />
      <div className="flex flex-col col-span-2 justify-between">
        <h3 className="text-sm font-bold line-clamp-1">{title}</h3>
        <p className="text-gray-500 line-clamp-2 md:line-clamp-3 lg:line-clamp-none">
          {description}
        </p>
        <div className="flex gap-2">
          <p className="text-sm">
            Qtd: <b>{amount}</b>
          </p>
          <p className="text-sm">
            Preço:{" "}
            <b>
              {CURRENCY} {price}
            </b>
          </p>
        </div>
        <Button size="small" variant="secondary">
          Gerenciar produto
        </Button>
      </div>
    </div>
  );
};

export default ProductManager;
