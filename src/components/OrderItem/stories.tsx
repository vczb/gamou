import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import OrderItem, { OrderItemProps } from '.';
import { orderMock } from './mock';

export default {
  title: 'OrderItem',
  component: OrderItem,
  args: {
    order: orderMock,
  },
} as Meta;

export const Default: StoryFn<OrderItemProps> = (args) => (
  <OrderItem {...args} />
);
