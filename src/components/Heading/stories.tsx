import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import Heading, { HeadingProps } from ".";

export default {
  title: "Heading",
  component: Heading,
  args: {
    text: "The Best Place to Buy",
    tag: "h1",
  },
} as Meta;

export const Default: StoryFn<HeadingProps> = (args) => <Heading {...args} />;
