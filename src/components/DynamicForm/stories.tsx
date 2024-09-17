import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import DynamicForm, { DynamicFormProps } from ".";

const schema = [
  {
    name: "email",
    label: "Email",
    type: "email",
    defaultValue: "vini@vini.com",
    editable: false,
    required: true,
  },
  {
    name: "name",
    label: "Nome",
    type: "text",
    editable: true,
    required: true,
  },
  {
    name: "password",
    label: "Senha",
    type: "password",
    defaultValue: "123456789",
    editable: false,
    required: true,
  },
  {
    name: "description",
    label: "Descrição",
    type: "description",
    editable: true,
    required: false,
  },
];

export default {
  title: "DynamicForm",
  component: DynamicForm,
  args: {
    formId: "crud",
    headingText: "Meus dados",
    schema,
    buttonText: "Salvar",
    handleSubmit: () => console.log("ok"),
    actionLink: {
      target: "#delete",
      text: "Deletar conta",
    },
  },
} as Meta;

export const Default: StoryFn<DynamicFormProps> = (args) => (
  <DynamicForm {...args} />
);
