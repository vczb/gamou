'use client';

import { ReactNode } from 'react';
import Button, { ButtonProps } from '../Button';
import sendWhatsApp from '@/utils/sendWhatsApp';

type WhatsButtonProps = {
  children: ReactNode | string;
  whatsapp: string;
  message: string;
} & ButtonProps;

const WhatsButton = ({
  children,
  message,
  whatsapp,
  ...props
}: WhatsButtonProps) => {
  return (
    <Button
      variant="emerald"
      onClick={() => sendWhatsApp(whatsapp, message)}
      {...props}
    >
      {children}
    </Button>
  );
};

export default WhatsButton;
