import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import HowItWorks from ".";

export default {
  title: "HowItWorks",
  component: HowItWorks,
} as Meta;

export const Default: StoryFn = () => <HowItWorks />;
