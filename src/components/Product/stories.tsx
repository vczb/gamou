import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import Product, { ProductProps } from ".";

export default {
  title: "Product",
  component: Product,
  args: {
    uid: "123",
    title: "Sample Product",
    image: "https://picsum.photos/200/300",
    description: "This is a sample product description.",
    price: 99.99,
  },
} as Meta;

export const Default: StoryFn<ProductProps> = (args) => <Product {...args} />;
