import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import CategoryProductList, { CategoryProductListProps } from ".";

const mockProducts = [
  {
    uid: "1",
    name: "Product 1",
    products: [
      {
        uid: "p1",
        title: "Product 1",
        image: "https://via.placeholder.com/150",
        description: "Description for product 1",
        price: 10.0,
      },
    ],
  },
  {
    uid: "2",
    name: "Product 2",
    products: [
      {
        uid: "p2",
        title: "Product 2",
        image: "https://via.placeholder.com/150",
        description: "Description for product 2",
        price: 20.0,
      },
    ],
  },
];

export default {
  title: "CategoryProductList",
  component: CategoryProductList,
  args: {
    uid: "category1",
    name: "Category 1",
    products: mockProducts,
  },
} as Meta;

export const Default: StoryFn<CategoryProductListProps> = (args) => (
  <CategoryProductList {...args} />
);
