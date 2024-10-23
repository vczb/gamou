import NextLink from "next/link";
import { ReactNode } from "react";

export type LinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
  id?: string;
  target?: string;
};

const Link = ({ href, children, className, id, target }: LinkProps) => {
  return (
    <NextLink
      href={href}
      className={className}
      id={id}
      target={target}
      passHref
    >
      {children}
    </NextLink>
  );
};

export default Link;
