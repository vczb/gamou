import CategoryLink, { CategoryLinkProps } from "../CategoryLink";

export type CategoryMenuProps = {
  categories: CategoryLinkProps[];
};

const CategoryMenu = ({ categories }: CategoryMenuProps) => {
  return (
    <div className="flex flex-row space-x-4 lg:space-x-6 pretty-scrollbar pb-2 text-blueGray-400">
      {categories.map((category) => (
        <CategoryLink {...category} key={category.uid} />
      ))}
    </div>
  );
};

export default CategoryMenu;
