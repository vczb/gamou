import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import CartItemList, { CartItemListProps } from ".";

export default {
  title: "CartItemList",
  component: CartItemList,
  args: {
    items: [
      {
        uid: "123",
        title: "Almodegas à grega",
        image: "http://localhost:3000/uploads/almodega_grega.webp",
        description:
          "Almôndegas 100% plant-based com arroz à grega, coalhada vegetal de amêndoas e tomate grape. Peso 271g",
        price: 35.06,
        amount: 1,
      },
      {
        uid: "890",
        title: "Sopas de Lentilha",
        image: "http://localhost:3000/uploads/creme_lentilha.webp",
        description: "Sopa de lentilha com legumes e alho. Peso 271g",
        price: 19.0,
        amount: 2,
      },
      {
        uid: "a321",
        title: "Agua",
        image: "http://localhost:3000/uploads/agua_mineral.webp",
        description: "Agua 500ml",
        price: 2.5,
        amount: 1,
      },
    ],
  },
} as Meta;

export const Default: StoryFn<CartItemListProps> = (args) => (
  <CartItemList {...args} />
);
