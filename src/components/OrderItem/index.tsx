import { Order } from '@/types/order';
import Ribbon from '../Ribbon';
import { ORDER_STATUS } from '@/utils/constants';
import { formatOrderSummaryToHTML } from '@/utils/formatters';

export type OrderItemProps = {
  order: Order;
};

const OrderItem = ({ order }: OrderItemProps) => {
  if (!order.summary) return;

  const summaryHTML = formatOrderSummaryToHTML(order?.summary);

  return (
    <div className="p-4 flex flex-col items-center justify-center transition-all shadow-sm hover:shadow-lg w-full gap-4 rounded bg-white border-blueGray-200 border-2 group relative">
      <div dangerouslySetInnerHTML={{ __html: summaryHTML || '' }} />
      <Ribbon>{ORDER_STATUS[order.status]}</Ribbon>
    </div>
  );
};

export default OrderItem;
