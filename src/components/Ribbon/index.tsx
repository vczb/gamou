'use client';

import { classNames } from '@/utils/ui-helpers';
import type React from 'react';

export type RibbonColors = 'primary' | 'black';
export type RibbonSizes = 'normal' | 'small';

export interface RibbonProps {
  children: React.ReactNode;
  color?: RibbonColors;
  size?: RibbonSizes;
  className?: string;
}

const Ribbon = ({
  children,
  color = 'primary',
  size = 'normal',
  className,
}: RibbonProps) => {
  return (
    <div
      className={classNames(
        'absolute top-4 flex items-center font-bold text-white z-10',
        // Color variants
        color === 'primary' && 'bg-primary-600 before:border-primary-600',
        color === 'black' && 'bg-black before:bg-black',
        // Size variants
        size === 'normal' &&
          'text-sm px-4 h-9 right-[-8px] before:top-9 before:border-t-4 before:border-r-8',
        size === 'small' &&
          'text-xs px-2 h-[26px] right-[-6px] before:top-[26px] before:border-t-[7px] before:border-r-6',
        // Triangle cutout
        'before:content-[""] before:absolute before:right-0 before:border-solid before:border-l-0 before:border-r-transparent before:border-b-transparent before:border-b-4',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Ribbon;
