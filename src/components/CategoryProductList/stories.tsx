import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import CategoryProductList, { CategoryProductListProps } from ".";

import mock from "../ProductList/mock";

export default {
  title: "CategoryProductList",
  component: CategoryProductList,
  args: {
    uid: "456",
    name: "Category 1",
    products: mock,
  },
} as Meta;

export const Default: StoryFn<CategoryProductListProps> = (args) => (
  <CategoryProductList {...args} />
);
