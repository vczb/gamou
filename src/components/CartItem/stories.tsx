import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import CartItem, { CartItemProps } from ".";

export default {
  title: "CartItem",
  component: CartItem,
  args: {
    uid: "xyz",
    title: "Mushroom Pizza 4x3",
    image: "https://picsum.photos/200/300",
    price: 121.5,
  },
} as Meta;

export const Default: StoryFn<CartItemProps> = (args) => <CartItem {...args} />;
