import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import AddToCartButton from ".";
import { ProductProps } from "../Product";

const product: ProductProps = {
  uid: "123",
  title: "Sample Product",
  image: "https://via.placeholder.com/150",
  description: "This is a sample product description.",
  price: 19.99,
};

export default {
  title: "AddToCartButton",
  component: AddToCartButton,
  args: {
    product,
  },
} as Meta;

export const Default: StoryFn = (args) => <AddToCartButton {...args} />;
