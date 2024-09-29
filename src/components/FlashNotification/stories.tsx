import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import FlashNotification from ".";

export default {
  title: "FlashNotification",
  component: FlashNotification,
} as Meta;

export const Default: StoryFn = () => <FlashNotification />;
