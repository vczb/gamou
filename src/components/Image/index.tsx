import { forwardRef, ImgHTMLAttributes } from "react";

type ImageProps = ImgHTMLAttributes<HTMLImageElement>;

const Image = forwardRef<HTMLImageElement, ImageProps>(({ ...props }, ref) => (
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  <img loading="lazy" ref={ref} {...props} />
));

Image.displayName = "Image";

export default Image;
