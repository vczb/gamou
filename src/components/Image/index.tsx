import { ImgHTMLAttributes } from "react";

type ImageProps = ImgHTMLAttributes<HTMLImageElement>;

// eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
const Image = ({ ...props }: ImageProps) => <img {...props} />;

export default Image;
