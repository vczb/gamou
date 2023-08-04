import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import CartButton, { CartButtonProps } from ".";

export default {
  title: "CartButton",
  component: CartButton,
  args: {
    message: "Items no carrinho",
    amount: 10,
    price: 179.99,
    onClick: () => console.log("ok"),
  },
} as Meta;

export const Default: StoryFn<CartButtonProps> = (args) => (
  <div className="h-[200vh] relative">
    <CartButton {...args} />
  </div>
);
