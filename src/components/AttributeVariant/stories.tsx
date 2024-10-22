import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import AttributeVariant, { AttributeVariantProps } from ".";

export default {
  title: "AttributeVariant",
  component: AttributeVariant,
  args: {},
} as Meta;

export const Default: StoryFn<AttributeVariantProps> = (args) => (
  <AttributeVariant {...args} />
);
