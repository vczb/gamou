import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import SignInForm from ".";

export default {
  title: "SignInForm",
  component: SignInForm,
} as Meta;

export const Default: StoryFn = (args) => <SignInForm {...args} />;
