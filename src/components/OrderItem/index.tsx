import { Order } from '@/types/order';
import Ribbon from '../Ribbon';
import { ORDER_STATUS } from '@/utils/constants';
import { formatOrderSummaryToHTML } from '@/utils/formatters';
import Button from '../Button';

export type OrderItemProps = {
  order: Order;
};

const OrderItem = ({ order }: OrderItemProps) => {
  if (!order.summary) return;

  const summaryHTML = formatOrderSummaryToHTML(order?.summary);

  return (
    <div
      className="p-4 flex flex-col items-center justify-center 
    transition-all shadow-sm hover:shadow-lg w-full gap-4 
    rounded bg-white border-blueGray-200 border-2 group relative
    lg:hover:scale-105 lg:hover:z-10"
    >
      <Ribbon>{ORDER_STATUS[order.status]}</Ribbon>
      <div dangerouslySetInnerHTML={{ __html: summaryHTML || '' }} />
      <Button type="submit" className="w-full" variant="emerald">
        Mover para empreparo
      </Button>
      <div className="flex justify-between w-full">
        <Button type="button" variant="light">
          Cancelar
        </Button>
        <Button type="button" variant="secondary">
          Editar
        </Button>
      </div>
    </div>
  );
};

export default OrderItem;
