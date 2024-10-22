import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import AttributeItem, { AttributeItemProps } from ".";

export default {
  title: "AttributeItem",
  component: AttributeItem,
  args: {},
} as Meta;

export const Default: StoryFn<AttributeItemProps> = (args) => (
  <AttributeItem {...args} />
);
