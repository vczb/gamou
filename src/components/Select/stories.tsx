import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import Select, { SelectProps } from ".";

export default {
  title: "Select",
  component: Select,
  args: {
    name: "example-select",
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
    ],
  },
} as Meta;

export const Default: StoryFn<SelectProps> = (args) => <Select {...args} />;
