import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import Pricing from ".";

export default {
  title: "Pricing",
  component: Pricing,
} as Meta;

const Template: StoryFn = (args) => <Pricing {...args} />;

export const Default = Template.bind({});
Default.args = {};
