import Orders from '@/containers/Orders';
import { OrderController } from '@/controllers/OrderController';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Seus pedidos',
  description: 'Acompanhe seus pedidos em tempo real',
};

const Index = async () => {
  const orderController = new OrderController();

  const [orderResponse] = await Promise.all([
    orderController.selectAllOrdersByToken(),
  ]);

  const { orders } = orderResponse.data;

  return <Orders orders={orders} />;
};

export default Index;
