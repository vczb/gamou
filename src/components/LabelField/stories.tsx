import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import LabelField, { LabelFieldProps } from ".";
import TextField from "../TextField";

export default {
  title: "LabelField",
  component: LabelField,
  args: {
    label: "Nome",
    sublabel: "Digite seu nome completo",
  },
} as Meta;

export const Default: StoryFn<LabelFieldProps> = (args) => (
  <LabelField {...args}>
    <TextField />
  </LabelField>
);
