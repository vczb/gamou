import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import QuestionsAndAnswers from ".";

export default {
  title: "QuestionsAndAnswers",
  component: QuestionsAndAnswers,
  args: {},
} as Meta;

export const Default: StoryFn = (args) => <QuestionsAndAnswers {...args} />;
