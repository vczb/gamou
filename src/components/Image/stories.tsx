import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import Image, { ImageProps } from ".";

export default {
  title: "Image",
  component: Image,
  args: {
    src: "https://picsum.photos/200/300",
    alt: "Sample Image",
    className: "w-full h-full",
  },
} as Meta;

// eslint-disable-next-line jsx-a11y/alt-text
export const Default: StoryFn<ImageProps> = (args) => <Image {...args} />;
