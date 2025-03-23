import Breadcrumb from '@/components/Breadcrumb';
import OrderItem from '@/components/OrderItem';
import Table from '@/components/Table';
import { Order } from '@/types/order';

const BREADCUMB = [
  { link: '/painel', label: 'Painel' },
  { link: '/painel/pedidos', label: 'Pedidos', active: true },
];

type Orders = {
  orders: Order[];
};

const columns = [
  { title: 'ID', key: 'id' },
  { title: 'Status', key: 'status' },
  // { title: 'Nome', key: 'customer_name' },
  // { title: 'Telefone', key: 'customer_phone' },
  // { title: 'Email', key: 'customer_email' },
  { title: 'Endereço', key: 'address' },
  { title: 'Valor total (R$)', key: 'total' },
];

const Orders = ({ orders }: Orders) => {
  return (
    <div className="container mx-auto px-4 pb-28 pt-8 ">
      <Breadcrumb items={BREADCUMB} />
      {/* <div className="mt-4">
        <Table columns={columns} data={orders} />
      </div> */}
      <div className="mt-4 flex flex-col m-auto gap-4 w-fit">
        {orders.map((order) => (
          <OrderItem key={order.updated_at.toString()} order={order} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
