import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import Form from ".";

export default {
  title: "Form",
  component: Form,
  args: {
    id: "example-form",
    className: "example-class",
    children: (
      <>
        <label htmlFor="example-input">Example Input:</label>
        <input id="example-input" type="text" />
      </>
    ),
  },
} as Meta;

export const Default: StoryFn = (args) => <Form {...args} />;
