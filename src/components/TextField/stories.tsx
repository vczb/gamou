import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import TextField, { TextFieldProps } from ".";

export default {
  title: "TextField",
  component: TextField,
  args: {
    placeholder: "Type your name",
  },
} as Meta;

export const Default: StoryFn<TextFieldProps> = (args) => (
  <TextField {...args} />
);
