import { Order } from '@/types/order';
import Ribbon from '../Ribbon';
import { ORDER_STATUS } from '@/utils/constants';
import { formatOrderSummaryToHTML } from '@/utils/formatters';
import Button from '../Button';
import { useOrder } from '@/hooks/use-order';
import { useCallback, useMemo } from 'react';

export type OrderItemProps = {
  order: Order;
};

const OrderItem = ({ order }: OrderItemProps) => {
  const { editOrder } = useOrder();

  const summaryHTML = formatOrderSummaryToHTML(order?.summary || '');

  const handleCancel = useCallback(async () => {
    await editOrder({ id: order.id, status: 'cancelled' });
  }, [editOrder, order.id]);

  const handleNextStatus = useCallback(async () => {
    const status = order.status;
    let newStatus: Order['status'] = 'pending';

    switch (status) {
      case 'pending':
        newStatus = 'processing';
        break;
      case 'processing':
        newStatus = 'completed';
        break;
    }

    await editOrder({ id: order.id, status: newStatus });
  }, [editOrder, order.id, order.status]);

  const statusValue = useMemo(() => {
    const status = order.status;
    let newStatus: Order['status'] = 'pending';

    switch (status) {
      case 'pending':
        newStatus = 'processing';
        break;
      case 'processing':
        newStatus = 'completed';
        break;
    }

    return ORDER_STATUS[newStatus];
  }, [order.status]);

  const shouldRenderMoveButton = useMemo(() => {
    return order.status !== 'cancelled' && order.status !== 'completed';
  }, [order.status]);

  const shouldRenderCancelButton = useMemo(
    () => order.status !== 'cancelled',
    [order.status]
  );

  if (!order.summary) return;
  return (
    <div
      className="p-4 flex flex-col items-center justify-center 
    transition-all shadow-sm hover:shadow-lg w-full gap-4 
    rounded bg-white border-blueGray-200 border-2 group relative
    lg:hover:scale-105 lg:hover:z-10"
    >
      <Ribbon>{ORDER_STATUS[order.status]}</Ribbon>
      <div dangerouslySetInnerHTML={{ __html: summaryHTML || '' }} />
      {shouldRenderMoveButton && (
        <Button className="w-full" variant="emerald" onClick={handleNextStatus}>
          Mover para {statusValue}
        </Button>
      )}
      {shouldRenderCancelButton && (
        <div className="flex justify-end w-full">
          <Button variant="light" onClick={handleCancel}>
            Cancelar
          </Button>
        </div>
      )}
    </div>
  );
};

export default OrderItem;
