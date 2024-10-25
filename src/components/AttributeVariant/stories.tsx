import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import AttributeVariant, { AttributeVariantProps } from ".";

const variantsMock = [
  {
    name: "P",
    amount: 2,
    price: 22.5,
  },
  {
    name: "M",
    amount: 5,
    price: 22.5,
  },
  {
    name: "G",
    amount: 0,
    price: 22.5,
  },
];

export default {
  title: "AttributeVariant",
  component: AttributeVariant,
  args: {
    title: "Tamanho",
    isMultiple: false,
    isRequired: true,
    variants: variantsMock,
  },
} as Meta;

export const Default: StoryFn<AttributeVariantProps> = (args) => (
  <AttributeVariant {...args} />
);
