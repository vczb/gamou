import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import CartItemList, { CartItemListProps } from ".";

export default {
  title: "CartItemList",
  component: CartItemList,
  args: {
    items: [
      {
        uid: "xyz",
        title: "Mushroom Pizza 4x3",
        image: "https://picsum.photos/200/300",
        price: 121.5,
      },
      {
        uid: "abc",
        title: "Hamburger",
        image: "https://picsum.photos/200/300",
        price: 55,
      },
      {
        uid: "qwe",
        title: "Cheese Pizza",
        image: "https://picsum.photos/200/300",
        price: 11,
      },
    ],
  },
} as Meta;

export const Default: StoryFn<CartItemListProps> = (args) => (
  <CartItemList {...args} />
);
