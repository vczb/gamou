import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import Button from ".";

export default {
  title: "Button",
  component: Button,
  args: {},
} as Meta;

export const Default: StoryFn = (args) => (
  <Button {...args}>Add to cart</Button>
);
