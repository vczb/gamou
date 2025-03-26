import OrderItem from '@/components/OrderItem';
import { Order } from '@/types/order';
import classNames from '@/utils/classNames';

export type OrderItemListProps = {
  orders: Order[];
  variant?: 'mansory' | 'normal';
};

const OrderItemList = ({ orders, variant = 'normal' }: OrderItemListProps) => {
  const className = classNames(
    variant === 'normal' &&
      'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 m-auto gap-4 w-fit auto-rows-auto',
    variant === 'mansory' &&
      'columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4'
  );

  return (
    <div className={className}>
      {!!orders.length ? (
        orders.map((order) => (
          <div
            key={order.updated_at.toString()}
            className="break-inside-avoid mb-4"
          >
            <OrderItem order={order} />
          </div>
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
