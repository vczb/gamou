import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import Checkbox, { CheckboxProps } from ".";

export default {
  title: "Checkbox",
  component: Checkbox,
  args: {
    label: "Accept Terms",
    className: "",
  },
} as Meta;

export const Default: StoryFn<CheckboxProps> = (args) => <Checkbox {...args} />;
