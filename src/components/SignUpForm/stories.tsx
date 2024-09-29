import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import SignUpForm from ".";

export default {
  title: "SignUpForm",
  component: SignUpForm,
} as Meta;

export const Default: StoryFn = (args) => <SignUpForm {...args} />;
