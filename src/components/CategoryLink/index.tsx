export type CategoryLinkProps = {
  image: string;
  name: string;
  uid: string;
};

const CategoryLink = ({ image, name, uid }: CategoryLinkProps) => {
  return (
    <div className="w-fit border-b-[1px] b-col border-current text-blueGray-600 hover:text-primary-500 duration-200">
      <a
        className="flex-col items-center justify-center cursor-pointer group text-center"
        href={`#${uid}`}
      >
        <picture className="flex w-24 h-24 lg:w-14 lg:h-14 rounded-full overflow-hidden group-hover:shadow-md mx-auto">
          <img
            className="w-full h-full group-hover:scale-125 duration-200"
            src={image}
            alt={name}
            loading="lazy"
          />
        </picture>
        <p className="mt-1 text-medium lg:text-small">{name}</p>
      </a>
    </div>
  );
};

export default CategoryLink;
