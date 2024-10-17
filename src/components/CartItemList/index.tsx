import CartItem, { CartItemProps } from "../CartItem";

export type CartItemListProps = {
  items: CartItemProps[];
};

const CartItemList = ({ items }: CartItemListProps) => {
  return (
    <div className="grid gap-0 lg:gap-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="border-dashed border-blueGray-200 p-4 border-b-2 "
        >
          <CartItem {...item} />
        </div>
      ))}
    </div>
  );
};

export default CartItemList;
