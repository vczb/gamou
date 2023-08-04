import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import Catalog, { CatalogProps } from ".";
import mock from "../ProductList/mock";

const catalog = [
  {
    uid: "456",
    name: "Category 1",
    products: mock,
  },
  {
    uid: "789",
    name: "Category 2",
    products: mock,
  },
  {
    uid: "012",
    name: "Category 2",
    products: mock,
  },
];

export default {
  title: "Catalog",
  component: Catalog,
  args: { catalog },
} as Meta;

export const Default: StoryFn<CatalogProps> = (args) => <Catalog {...args} />;
