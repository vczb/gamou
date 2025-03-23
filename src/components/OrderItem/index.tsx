import { Order } from '@/types/order';

export type OrderItemProps = {
  order: Order;
};

const OrderItem = ({ order }: OrderItemProps) => {
  if (!order.summary) return;

  function formatOrderSummaryToHTML(text: string) {
    if (!text) return;

    return text
      .replace(/\n/g, '<br>') // Convert new lines to <br>
      .replace(/\*(.*?)\*/g, '<strong>$1</strong>'); // Convert *text* to bold
  }

  console.log(order);

  const summaryHTML = formatOrderSummaryToHTML(order?.summary);

  return (
    <div className="p-4 flex flex-col items-center justify-center transition-all shadow-sm hover:shadow-lg w-full gap-4 rounded bg-white border-blueGray-200 border-2 group">
      <div dangerouslySetInnerHTML={{ __html: summaryHTML || '' }} />
    </div>
  );
};

export default OrderItem;
