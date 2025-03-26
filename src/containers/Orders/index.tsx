'use client';

import Breadcrumb from '@/components/Breadcrumb';
import Select from '@/components/Select';
import OrderItemList from '@/components/OrderItemList';
import { Order } from '@/types/order';
import {
  ORDER_STATUS,
  DEFAULT_ORDER_STATUS,
  ONE_HOUR_MS,
  THREE_HOURS_MS,
  ONE_DAY_MS,
  ONE_WEEK,
  ONE_MONTH,
} from '@/utils/constants';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';

const BREADCUMB = [
  { link: '/painel', label: 'Painel' },
  { link: '/painel/pedidos', label: 'Pedidos', active: true },
];

const SORT_BY = [
  { value: 'one_hour', label: '1 hora' },
  { value: 'three_hours', label: '3 horas' },
  { value: 'today', label: 'Hoje' },
  { value: 'week', label: 'Semana' },
  { value: 'month', label: 'Mês' },
];

const DEFAULT_SORT = 'week';

type Orders = {
  orders: Order[];
};

const Orders = ({ orders }: Orders) => {
  const [filteredItems, setFilteredItems] = useState(
    orders.filter((order) => order.status === DEFAULT_ORDER_STATUS)
  );
  const [statusFilter, setStatusFilter] = useState(DEFAULT_ORDER_STATUS);
  const [periodFilter, setPeriodFilter] = useState<string | null>(DEFAULT_SORT);

  const selectOptions = Object.entries(ORDER_STATUS).map(([key, value]) => ({
    value: key,
    label: value,
  }));

  const handleSelectStatus = useCallback((value: string) => {
    setStatusFilter(value || DEFAULT_ORDER_STATUS);
  }, []);

  const handleSelectPeriod = useCallback((value: string) => {
    setPeriodFilter(value || null);
  }, []);

  useEffect(() => {
    const now = Date.now();
    let periodMs: number | null = null;

    switch (periodFilter) {
      case 'one_hour':
        periodMs = ONE_HOUR_MS;
        break;
      case 'three_hours':
        periodMs = THREE_HOURS_MS;
        break;
      case 'today':
        periodMs = ONE_DAY_MS;
        break;
      case 'this_week':
        periodMs = ONE_WEEK;
        break;
      case 'month':
        periodMs = ONE_MONTH;
        break;
      default:
        periodMs = null;
    }

    const filtered = orders.filter((order) => {
      const byStatus = order.status === statusFilter;

      const byTime = periodMs
        ? now - new Date(order.updated_at).getTime() < periodMs
        : true;

      return byStatus && byTime;
    });

    setFilteredItems(filtered);
  }, [orders, statusFilter, periodFilter]);

  return (
    <div className="container mx-auto px-4 pb-28 pt-8">
      <Breadcrumb items={BREADCUMB} />

      <div className="mt-4 flex flex-col md:flex-row md:gap-4">
        <div className="flex flex-col">
          <div className="text-medium text-blueGray-600">
            Filtrar por status:
          </div>
          <Select
            options={selectOptions}
            title="Filtrar por Status"
            name="order-status-select"
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              handleSelectStatus(e?.target?.value)
            }
          />
        </div>
        <div className="flex flex-col  mt-2 md:mt-0">
          <div className="text-medium text-blueGray-600">Filtrar por data:</div>
          <Select
            options={SORT_BY}
            title="Filtrar por período"
            name="order-date-select"
            defaultValue={DEFAULT_SORT}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              handleSelectPeriod(e?.target?.value)
            }
          />
        </div>
      </div>
      <div className="mt-4">
        <OrderItemList orders={filteredItems} />
      </div>
    </div>
  );
};

export default Orders;
