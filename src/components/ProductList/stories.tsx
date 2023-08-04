import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import ProductList, { ProductListProps } from ".";
import mock from "./mock";

export default {
  title: "ProductList",
  component: ProductList,
  args: {
    products: mock,
  },
} as Meta;

export const Default: StoryFn<ProductListProps> = (args) => (
  <ProductList {...args} />
);
