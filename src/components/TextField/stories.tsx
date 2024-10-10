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

export const WithPatternCheck: StoryFn<TextFieldProps> = (args) => (
  <TextField
    {...args}
    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
    type="email"
    helperText="Please enter a valid email address"
  />
);
