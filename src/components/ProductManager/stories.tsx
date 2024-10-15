import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import ProductManager, { ProductManagerProps } from ".";

export default {
  title: "ProductManager",
  component: ProductManager,
  args: {
    product: {
      id: "123",
      title: "Sample ProductManager",
      image: "https://picsum.photos/200/300",
      description:
        "This is a sample product description. This is a sample product description. This is a sample product description.",
      price: 99.99,
      amount: 4,
    },
  },
} as Meta;

export const Default: StoryFn<ProductManagerProps> = (args) => (
  <ProductManager product={args.product} categories={[]} />
);
