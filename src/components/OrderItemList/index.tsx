import OrderItem from '@/components/OrderItem';
import { Order } from '@/types/order';

export type OrderItemListProps = {
  orders: Order[];
};

const OrderItemList = ({ orders }: OrderItemListProps) => {
  return (
    <div className="flex flex-col m-auto gap-4 w-fit">
      {!!orders.length ? (
        orders.map((order) => (
          <OrderItem key={order.updated_at.toString()} order={order} />
        ))
      ) : (
        <div className="text-medium text-blueGray-600">
          Não há items para esta busca
        </div>
      )}
    </div>
  );
};

export default OrderItemList;
