import NumberField from "../NumberField";
import Trash from "../../icons/Trash";
import { ProductProps } from "../Product";

export type CartItemProps = Omit<ProductProps, "description">;

const CartItem = ({ currency = "$", image, price, title }: CartItemProps) => {
  return (
    <div className="grid grid-cols-[1fr_auto] gap-2 md:grid-cols-3 md:gap-4 max-w-sm">
      <img
        src={image}
        alt={title}
        className="hidden md:block md:row-start-1 md:row-end-3"
      />
      <p className="font-bold text-medium md:text-large text-black">{title}</p>
      <p className="font-bold text-medium md:text-large text-primary-500 justify-self-end">
        {`${currency} ${price}`}
      </p>
      <div className="flex items-center">
        <NumberField />
        <i className="text-blueGray-600 ml-2 text-small">Unidade(s)</i>
      </div>
      <button className="w-4 h-4 self-center justify-self-end">
        <Trash className="text-blueGray-500 hover:text-blueGray-800 fill-current duration-200" />
      </button>
    </div>
  );
};

export default CartItem;
