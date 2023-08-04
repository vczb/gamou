import { useMemo } from "react";

export type HeadingProps = {
  text: string;
  tag?: "h1" | "h2" | "h3";
};

const SIZES = {
  h1: "text-2xl",
  h2: "text-xl",
  h3: "text-lg",
};

const Heading = ({ text, tag = "h1" }: HeadingProps) => {
  const Component = useMemo(() => {
    return tag;
  }, [tag]);

  const fontSize = useMemo(() => {
    return SIZES[tag] || "text-base";
  }, [tag]);

  return (
    <Component className={`${fontSize} text-black font-bold`}>{text}</Component>
  );
};

export default Heading;
