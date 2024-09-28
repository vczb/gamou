import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import Table, { TableProps } from ".";
import Button from "../Button";
import Image from "../Image";

export default {
  title: "Table",
  component: Table,
} as Meta;

const columns = [
  { title: "Image", key: "image" },
  { title: "Title", key: "title" },
  { title: "Description", key: "description" },
  { title: "Active", key: "active" },
  { title: "Actions", key: "actions" },
];

const data = [
  {
    title: "Electronics",
    description: "Devices, gadgets, and accessories.",
    image: (
      <Image
        src="https://picsum.photos/100/50"
        alt="electronics"
        loading="lazy"
      />
    ),
    active: "Yes",
    actions: (
      <div className="flex gap-1">
        <Button variant="secondary">Edit</Button>
        <Button variant="light">Delete</Button>
      </div>
    ),
  },
  {
    title: "Furniture",
    description: "Home and office furniture.",
    image: (
      <Image
        src="https://picsum.photos/100/50"
        alt="furniture"
        loading="lazy"
      />
    ),
    active: "No",
    actions: (
      <div className="flex gap-1">
        <Button variant="secondary">Edit</Button>
        <Button variant="light">Delete</Button>
      </div>
    ),
  },
  {
    title: "Clothing",
    description: "Men's and Women's fashion.",
    image: (
      <Image src="https://picsum.photos/100/50" alt="clothing" loading="lazy" />
    ),
    active: "Yes",
    actions: (
      <div className="flex gap-1">
        <Button variant="secondary">Edit</Button>
        <Button variant="light">Delete</Button>
      </div>
    ),
  },
  {
    title: "Books",
    description: "Fiction, non-fiction, and educational books.",
    image: (
      <Image src="https://picsum.photos/100/50" alt="books" loading="lazy" />
    ),
    active: "Yes",
    actions: (
      <div className="flex gap-1">
        <Button variant="secondary">Edit</Button>
        <Button variant="light">Delete</Button>
      </div>
    ),
  },
  {
    title: "Beauty Products",
    description: "Skincare, makeup, and personal care items.",
    image: (
      <Image
        src="https://picsum.photos/100/50"
        alt="beauty products"
        loading="lazy"
      />
    ),
    active: "Yes",
    actions: (
      <div className="flex gap-1">
        <Button variant="secondary">Edit</Button>
        <Button variant="light">Delete</Button>
      </div>
    ),
  },
  {
    title: "Sports Equipment",
    description: "Equipment for indoor and outdoor sports.",
    image: (
      <Image
        src="https://picsum.photos/100/50"
        alt="sports equipment"
        loading="lazy"
      />
    ),
    active: "No",
    actions: (
      <div className="flex gap-1">
        <Button variant="secondary">Edit</Button>
        <Button variant="light">Delete</Button>
      </div>
    ),
  },
  {
    title: "Groceries",
    description: "Fresh produce, packaged foods, and beverages.",
    image: (
      <Image
        src="https://picsum.photos/100/50"
        alt="groceries"
        loading="lazy"
      />
    ),
    active: "Yes",
    actions: (
      <div className="flex gap-1">
        <Button variant="secondary">Edit</Button>
        <Button variant="light">Delete</Button>
      </div>
    ),
  },
  {
    title: "Toys",
    description: "Toys and games for children of all ages.",
    image: (
      <Image src="https://picsum.photos/100/50" alt="toys" loading="lazy" />
    ),
    active: "No",
    actions: (
      <div className="flex gap-1">
        <Button variant="secondary">Edit</Button>
        <Button variant="light">Delete</Button>
      </div>
    ),
  },
  {
    title: "Stationery",
    description: "Office supplies, notebooks, and writing materials.",
    image: (
      <Image
        src="https://picsum.photos/100/50"
        alt="stationery"
        loading="lazy"
      />
    ),
    active: "Yes",
    actions: (
      <div className="flex gap-1">
        <Button variant="secondary">Edit</Button>
        <Button variant="light">Delete</Button>
      </div>
    ),
  },
  {
    title: "Automotive",
    description: "Car accessories, tools, and equipment.",
    image: (
      <Image
        src="https://picsum.photos/100/50"
        alt="automotive"
        loading="lazy"
      />
    ),
    active: "No",
    actions: (
      <div className="flex gap-1">
        <Button variant="secondary">Edit</Button>
        <Button variant="light">Delete</Button>
      </div>
    ),
  },
];

const Template: StoryFn<TableProps> = (args) => <Table {...args} />;

export const Default = Template.bind({});
Default.args = {
  columns,
  data,
};
