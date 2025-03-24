import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import Ribbon, { RibbonProps } from '.';

export default {
  title: 'Ribbon',
  component: Ribbon,
  args: {},
} as Meta;

export const Default: StoryFn<RibbonProps> = (args) => (
  <div className="relative m-52 w-96 h-96">
    <Ribbon {...args} color="black" size="normal">
      10% off
    </Ribbon>
  </div>
);
