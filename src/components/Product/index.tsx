import AddToCartButton from "@/components/AddToCartButton";
import { CURRENCY } from "@/utils/constants";
import Image from "../Image";

export type ProductProps = {
  uid: string;
  title: string;
  image: string;
  description: string;
  price: number;
};

const Product = (product: ProductProps) => {
  const { title, image, description, price, uid } = product;
  return (
    <div id={uid} className="grid gap-2 p-2 max-w-4xl md:grid-cols-2">
      <div className="flex pb-2 border-b-2 md:border-b-0 md:pb-0 md:row-span-2">
        <Image
          src={image}
          alt={title}
          className="w-20 h-20 md:w-32 md:h-32 lg:w-48 lg:h-48"
        />
        <div className="ml-4">
          <p className="text-medium md:text-large font-bold">{title}</p>
          <p className="text-large text-primary-600 font-bold ">{`${CURRENCY} ${price}`}</p>
        </div>
      </div>
      <p className="text-medium text-blueGray-600">{description}</p>
      <AddToCartButton product={product} />
    </div>
  );
};

export default Product;
