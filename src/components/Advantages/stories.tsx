import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import Advantages from ".";

export default {
  title: "Advantages",
  component: Advantages,
} as Meta;

export const Default: StoryFn = () => <Advantages />;
