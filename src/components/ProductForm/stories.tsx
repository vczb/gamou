import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import ProductForm, { ProductFormProps } from ".";

const categoryMock1 = {
  id: 1,
  title: "Sopas e Caldos",
  image: "https://picsum.photos/200/300?random=8",
  description: "Pratos quentes perfeitos para um dia de inverno.",
  active: true,
  company_id: 123,
};

const categoryMock2 = {
  id: 2,
  title: "Comidas Típicas",
  image: "https://picsum.photos/200/300?random=9",
  description: "Pratos tradicionais brasileiros para compartilhar em família.",
  active: true,
  company_id: 123,
};

const categoryMock3 = {
  id: 3,
  title: "Saladas",
  image: "https://picsum.photos/200/300?random=10",
  description: "Opções frescas e saudáveis para dias quentes.",
  active: true,
  company_id: 123,
};

const categoryMock4 = {
  id: 3,
  title: "Sobremesas",
  image: "https://picsum.photos/200/300?random=11",
  description: "Doces e sobremesas de qualidade.",
  active: true,
  company_id: 123,
};

export default {
  title: "ProductForm",
  component: ProductForm,
  args: {
    action: "edit",
    product: {
      id: 2,
      title: "Comidas Típicas",
      image: "https://picsum.photos/200/300?random=9",
      description:
        "Pratos tradicionais brasileiros para compartilhar em família.",
      active: true,
      company_id: 123,
    },
    categories: [categoryMock1, categoryMock2, categoryMock3, categoryMock4],
  },
} as Meta;

export const Default: StoryFn<ProductFormProps> = (args) => (
  <ProductForm {...args} />
);
