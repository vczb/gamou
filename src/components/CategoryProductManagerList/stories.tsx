import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import CategoryProductManagerList, { CategoryProductManagerListProps } from ".";

const productsMock1 = [
  {
    id: "123",
    title: "Sopa de Legumes",
    image: "https://picsum.photos/200/300?random=1",
    description:
      "Uma deliciosa sopa de legumes perfeita para aquecer nos dias frios.",
    price: 20.0,
    amount: 3,
  },
  {
    id: "124",
    title: "Caldo Verde",
    image: "https://picsum.photos/200/300?random=2",
    description:
      "Caldo verde tradicional feito com couve, batatas e linguiça defumada.",
    price: 25.0,
    amount: 5,
  },
  {
    id: "125",
    title: "Sopa de Abóbora",
    image: "https://picsum.photos/200/300?random=3",
    description:
      "Sopa cremosa de abóbora com um toque de gengibre e especiarias.",
    price: 22.5,
    amount: 2,
  },
];

const productsMock2 = [
  {
    id: "126",
    title: "Feijão Tropeiro",
    image: "https://picsum.photos/200/300?random=4",
    description: "Feijão tropeiro tradicional com farinha, carne seca e couve.",
    price: 30.0,
    amount: 6,
  },
  {
    id: "127",
    title: "Feijoada Completa",
    image: "https://picsum.photos/200/300?random=5",
    description: "Feijoada completa com carnes, arroz, farofa e couve.",
    price: 35.0,
    amount: 8,
  },
];

const productsMock3 = [
  {
    id: "128",
    title: "Salada Caesar",
    image: "https://picsum.photos/200/300?random=6",
    description:
      "Salada Caesar com alface romana, croutons, parmesão e molho Caesar.",
    price: 18.0,
    amount: 4,
  },
  {
    id: "129",
    title: "Salada Grega",
    image: "https://picsum.photos/200/300?random=7",
    description: "Salada grega com pepino, tomate, azeitonas e queijo feta.",
    price: 16.0,
    amount: 7,
  },
];

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

const itemMock1 = {
  category: categoryMock1,
  products: productsMock1,
};

const itemMock2 = {
  category: categoryMock2,
  products: productsMock2,
};

const itemMock3 = {
  category: categoryMock3,
  products: productsMock3,
};

const itemMock4 = {
  category: categoryMock4,
  products: [],
};

const categoryProductManagerListMock = [
  itemMock1,
  itemMock2,
  itemMock3,
  itemMock4,
];

export default {
  title: "CategoryProductManagerList",
  component: CategoryProductManagerList,
  args: {
    categoryProductManagerList: categoryProductManagerListMock,
  },
} as Meta;

export const Default: StoryFn<CategoryProductManagerListProps> = (args) => (
  <CategoryProductManagerList {...args} />
);
