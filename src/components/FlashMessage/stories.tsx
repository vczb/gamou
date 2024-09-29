import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import FlashMessage, { FlashMessageProps } from ".";

export default {
  title: "FlashMessage",
  component: FlashMessage,
  args: {
    variant: "alert",
    message: "This is an alert message",
  },
} as Meta;

export const Default: StoryFn<FlashMessageProps> = (args) => (
  <FlashMessage {...args} />
);
