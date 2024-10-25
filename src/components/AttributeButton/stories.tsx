import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import AttributeButton, { AttributeButtonProps } from ".";

export default {
  title: "AttributeButton",
  component: AttributeButton,
  args: {},
} as Meta;

export const Default: StoryFn<AttributeButtonProps> = (args) => (
  <AttributeButton {...args} />
);
