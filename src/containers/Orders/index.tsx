'use client';

import Breadcrumb from '@/components/Breadcrumb';
import OrderItem from '@/components/OrderItem';
import Select from '@/components/Select';
import { Order } from '@/types/order';
import { ORDER_STATUS, DEFAULT_ORDER_STATUS } from '@/utils/constants';
import { ChangeEvent, useCallback, useState } from 'react';
import OrderItemList from './OrderItemList';

const BREADCUMB = [
  { link: '/painel', label: 'Painel' },
  { link: '/painel/pedidos', label: 'Pedidos', active: true },
];

type Orders = {
  orders: Order[];
};

const Orders = ({ orders }: Orders) => {
  const [filteredItems, setFilteredItems] = useState(
    orders.filter((order) => order.status === DEFAULT_ORDER_STATUS)
  );

  const selectOptions = Object.entries(ORDER_STATUS).map(([key, value]) => ({
    value: key,
    label: value,
  }));

  const handleSelect = useCallback(
    (value: string) => {
      const newStatus = value || DEFAULT_ORDER_STATUS;
      setFilteredItems(orders.filter((item) => item.status == newStatus));
    },
    [orders]
  );

  return (
    <div className="container mx-auto px-4 pb-28 pt-8">
      <Breadcrumb items={BREADCUMB} />

      <div className="mt-4 flex flex-col">
        <div className="text-medium text-blueGray-600">Filtrar por status:</div>
        <Select
          options={selectOptions}
          title="Filtrar por Status"
          name="order-status-select"
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            handleSelect(e?.target?.value)
          }
        />
      </div>
      <div className="mt-4">
        <OrderItemList orders={filteredItems} />
      </div>
    </div>
  );
};

export default Orders;
