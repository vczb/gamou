import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import AttributeForm, { AttributeFormProps } from ".";

const mock = [
  {
    title: "Cor",
    isRequired: true,
    isMultiple: false,
    options: [{ name: "Preto" }, { name: "Vermelho" }],
  },
  {
    title: "Tamanho",
    isRequired: false,
    isMultiple: true,
    options: [{ name: "P" }, { name: "M" }, { name: "G" }],
  },
  {
    title: "Para levar",
    isRequired: false,
    isMultiple: true,
    options: [{ name: "Doce" }, { name: "Salada" }],
  },
];

export default {
  title: "AttributeForm",
  component: AttributeForm,
  args: {
    formId: "mock-form",
    variants: mock,
    // @ts-ignore
    onSubmit: (data) => console.log(data),
  },
} as Meta;

export const Default: StoryFn<AttributeFormProps> = (args) => (
  <AttributeForm {...args} />
);
