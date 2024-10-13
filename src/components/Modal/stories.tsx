import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import Modal from ".";
import SignUpForm from "../SignUpForm";

export default {
  title: "Modal",
  component: Modal,
  args: {
    isOpen: true,
  },
} as Meta;

export const Default: StoryFn = (args) => (
  <Modal {...args}>
    <SignUpForm />
  </Modal>
);
