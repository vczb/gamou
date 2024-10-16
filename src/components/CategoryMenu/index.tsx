import { Category } from "@/types/category";
import CategoryLink from "../CategoryLink";

export type CategoryMenuProps = {
  categories: Category[];
};

const CategoryMenu = ({ categories }: CategoryMenuProps) => {
  return (
    <div className="flex flex-row space-x-4 lg:space-x-6 pretty-scrollbar pb-2 text-blueGray-400">
      {categories.map((category) => (
        <CategoryLink
          key={category.id}
          image={category?.image || ""}
          name={category?.title || ""}
          id={String(category.id)}
        />
      ))}
    </div>
  );
};

export default CategoryMenu;
