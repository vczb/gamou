import CartItem, { CartItemProps } from "../CartItem";

export type CartItemListProps = {
  items: CartItemProps[];
};

const CartItemList = ({ items }: CartItemListProps) => (
  <div className="grid gap-4">
    {items.map((item) => (
      <div
        key={item.uid}
        className="mb-4 pb-4 border-b-2 border-dashed border-blueGray-200 last:border-none last:mb-0 last:pb-0"
      >
        <CartItem {...item} />
      </div>
    ))}
  </div>
);

export default CartItemList;
