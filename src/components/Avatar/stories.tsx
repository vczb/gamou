import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import Avatar, { AvatarProps } from ".";

export default {
  title: "Avatar",
  component: Avatar,
  args: {
    alt: "A random image",
    src: "https://picsum.photos/200/300",
  },
} as Meta;

export const Default: StoryFn<AvatarProps> = (args) => <Avatar {...args} />;
