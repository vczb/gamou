import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import CartButton, { CartButtonProps } from ".";

export default {
  title: "CartButton",
  component: CartButton,
  args: {
    variant: "black",
  },
} as Meta;

export const Default: StoryFn<CartButtonProps> = (args) => (
  <CartButton {...args} />
);
