import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import GetStarted, { GetStartedProps } from ".";

export default {
  title: "GetStarted",
  component: GetStarted,
  args: {
    title: "Get Started with Our Service",
    subtitle: "Join us today and start enjoying the benefits!",
    cta: "Sign Up Now",
  },
} as Meta;

export const Default: StoryFn<GetStartedProps> = (args) => <GetStarted {...args} />;
