import NextLink from "next/link";
import { ReactNode } from "react";

type LinkProps = {
  href: string;
  className: string;
  children: ReactNode;
};

const Link = ({ href, children, className }: LinkProps) => {
  return (
    <NextLink href={href} className={className} passHref>
      {children}
    </NextLink>
  );
};

export default Link;
