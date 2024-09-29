import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import GoBackLink, { GoBackLinkProps } from ".";

export default {
  title: "GoBackLink",
  component: GoBackLink,
  args: {
    path: "/home",
    text: "Go Back",
  },
} as Meta;

export const Default: StoryFn<GoBackLinkProps> = (args) => <GoBackLink {...args} />;
