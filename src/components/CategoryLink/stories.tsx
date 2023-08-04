import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import CategoryLink, { CategoryLinkProps } from ".";

export default {
  title: "CategoryLink",
  component: CategoryLink,
  args: {
    uid: "shoes",
    name: "SHOES",
    image: "https://picsum.photos/200/300",
  },
} as Meta;

export const Default: StoryFn<CategoryLinkProps> = (args) => (
  <CategoryLink {...args} />
);
