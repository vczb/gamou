import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import SearchField, { SearchFieldProps } from ".";

export default {
  title: "SearchField",
  component: SearchField,
  args: {
    placeholder: "Search...",
  },
} as Meta;

export const Default: StoryFn<SearchFieldProps> = (args) => (
  <SearchField {...args} />
);
