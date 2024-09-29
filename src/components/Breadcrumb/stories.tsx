import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import Breadcrumb, { BreadcrumbProps } from ".";

export default {
  title: "Breadcrumb",
  component: Breadcrumb,
  args: {
    items: [
      { link: "/home", label: "Home" },
      { link: "/products", label: "Products" },
      { link: "/products/123", label: "Product Details", active: true },
    ],
  },
} as Meta;

export const Default: StoryFn<BreadcrumbProps> = (args) => <Breadcrumb {...args} />;
