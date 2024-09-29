import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import ControlCardList, { ControlCardListProps } from ".";

const items = [
  {
    icon: () => <div>Icon</div>,
    label: "Label 1",
    link: "/link1",
  },
  {
    icon: () => <div>Icon</div>,
    label: "Label 2",
    link: "/link2",
  },
  {
    icon: () => <div>Icon</div>,
    label: "Label 3",
    link: "/link3",
  },
];

export default {
  title: "ControlCardList",
  component: ControlCardList,
  args: {
    items,
  },
} as Meta;

export const Default: StoryFn<ControlCardListProps> = (args) => (
  <ControlCardList {...args} />
);
