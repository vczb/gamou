import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import CategoryMenu, { CategoryMenuProps } from ".";

const categories = [
  {
    uid: "shoes",
    name: "SHOES",
    image: "https://picsum.photos/200/300",
  },
  {
    uid: "boots",
    name: "BOOTS",
    image: "https://picsum.photos/200/300",
  },
  {
    uid: "sneakers",
    name: "SNEAKERS",
    image: "https://picsum.photos/200/300",
  },
  {
    uid: "sandals",
    name: "SANDALS",
    image: "https://picsum.photos/200/300",
  },
  {
    uid: "heels",
    name: "HEELS",
    image: "https://picsum.photos/200/300",
  },
];

export default {
  title: "CategoryMenu",
  component: CategoryMenu,
  args: {
    categories,
  },
} as Meta;

export const Default: StoryFn<CategoryMenuProps> = (args) => (
  <CategoryMenu {...args} />
);
