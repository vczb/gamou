import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import MenuBar, { MenuBarProps } from ".";

const items = [
  {
    target: "/home",
    text: "Home",
    type: "link",
  },
  {
    target: "/about",
    text: "About",
    type: "link",
  },
  {
    target: "/contact",
    text: "Contact",
    type: "link",
  },
  {
    target: "/signup",
    text: "Sign Up",
    type: "button",
  },
];

export default {
  title: "MenuBar",
  component: MenuBar,
  args: {
    items,
  },
} as Meta;

export const Default: StoryFn<MenuBarProps> = (args) => <MenuBar {...args} />;
