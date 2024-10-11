import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import DynamicForm, { DynamicFormProps } from ".";
import { PASSWORD_PATTERN } from "@/utils/regex";

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
    defaultValue: "Abc123DEF",
    sublabel: "Deve conter pelo menos 4 dígitos sendo um deles maiúsculo",
    pattern: PASSWORD_PATTERN.source,
    helperText: "Senha não corresponde ao padrão",
    editable: true,
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
    btnProps: {
      text: "Cadastrar-se",
      target: "/cadastro",
    },
    handleSubmit: () => console.log("ok"),
    linkProps: {
      target: "#delete",
      text: "Deletar conta",
    },
  },
} as Meta;

export const Default: StoryFn<DynamicFormProps> = (args) => (
  <DynamicForm {...args} />
);
