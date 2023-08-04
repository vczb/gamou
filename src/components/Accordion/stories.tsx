import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import Accordion, { AccordionProps } from ".";

export default {
  title: "Accordion",
  component: Accordion,
  args: {
    title: "PROMOÇÕES",
  },
} as Meta;

export const Default: StoryFn<AccordionProps> = (args) => (
  <Accordion {...args}>
    <>any children</>
  </Accordion>
);
