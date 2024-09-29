import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import UploadImage, { UploadImageProps } from ".";

export default {
  title: "UploadImage",
  component: UploadImage,
  args: {
    name: "upload",
    defaultValue: "https://via.placeholder.com/150",
  },
} as Meta;

export const Default: StoryFn<UploadImageProps> = (args) => (
  <UploadImage {...args} />
);
