import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import ControlCard, { ControlCardProps } from ".";

export default {
  title: "ControlCard",
  component: ControlCard,
  args: {
    icon: () => <div>Icon</div>,
    label: "Control Card Label",
    link: "/control-card-link",
  },
} as Meta;

export const Default: StoryFn<ControlCardProps> = (args) => (
  <ControlCard {...args} />
);
