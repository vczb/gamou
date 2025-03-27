import Link from 'next/link';
import Image from 'next/image';

const CustomLink = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const href = props.href;

  if (href?.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href?.startsWith('#')) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

const CustomImage = (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
  if (!props.src) {
    return null;
  }

  // For external images (starting with http)
  if (props.src.startsWith('http')) {
    return <img className="rounded-lg" {...props} />;
  }

  // For local images
  return (
    <div className="relative aspect-video my-6 overflow-hidden rounded-lg">
      <Image
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        src={props.src}
        alt={props.alt || ''}
        className="object-cover"
      />
    </div>
  );
};

const MDXComponents = {
  a: CustomLink,
  img: CustomImage,
  Image: (props: any) => <CustomImage {...props} />,
  // Add more custom components as needed
};

export default MDXComponents;