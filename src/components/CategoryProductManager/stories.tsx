import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import CategoryProductManager, { CategoryProductManagerProps } from ".";

const mockProducts = [
  {
    id: "123",
    title: "Sample ProductManager",
    image: "https://picsum.photos/200/300?random=10",
    description:
      "This is a sample product description. This is a sample product description. This is a sample product description.",
    price: 99.99,
    amount: 4,
  },
  {
    id: "123",
    title: "Sample ProductManager",
    image: "https://picsum.photos/200/300?random=11",
    description:
      "This is a sample product description. This is a sample product description. This is a sample product description.",
    price: 99.99,
    amount: 4,
  },
  {
    id: "123",
    title: "Sample ProductManager",
    image: "https://picsum.photos/200/300?random=14",
    description:
      "This is a sample product description. This is a sample product description. This is a sample product description.",
    price: 99.99,
    amount: 4,
  },
];

const categoryMock = {
  id: 123,
  title: "Sopas e Cremes",
  image: "https://picsum.photos/200/300?random=2",
  description: "Pratos quentes feitos para um dia de inverno",
  active: true,
  company_id: 123,
};

export default {
  title: "CategoryProductManager",
  component: CategoryProductManager,
  args: {
    category: categoryMock,
    products: mockProducts,
  },
} as Meta;

export const Default: StoryFn<CategoryProductManagerProps> = (args) => (
  <CategoryProductManager {...args} />
);
