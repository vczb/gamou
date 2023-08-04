export type AvatarProps = {
  src: string;
  alt: string;
};

const Avatar = ({ src, alt }: AvatarProps) => {
  return (
    <div className="shadow-lg bg-white rounded-md w-40 h-36 p-2 overflow-hidden">
      <img className="w-full h-full" src={src} alt={alt} loading="lazy" />
    </div>
  );
};

export default Avatar;
