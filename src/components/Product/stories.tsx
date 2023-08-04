import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import Product, { ProductProps } from ".";

export default {
  title: "Product",
  component: Product,
  args: {
    uid: "xyz",
    title: "Mushroom Pizza 4x3",
    image: "https://picsum.photos/200/300",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    price: 121.5,
  },
} as Meta;

export const Default: StoryFn<ProductProps> = (args) => <Product {...args} />;
