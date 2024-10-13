import CategoryProductManager, {
  CategoryProductManagerProps,
} from "../CategoryProductManager";

export type CategoryProductManagerListProps = {
  categoryProductManagerList: CategoryProductManagerProps[];
};

const CategoryProductManagerList = ({
  categoryProductManagerList = [],
}: CategoryProductManagerListProps) => {
  if (!categoryProductManagerList?.length) {
    return null;
  }

  return (
    <div className="grid gap-4">
      {categoryProductManagerList.map((item, index) => (
        <CategoryProductManager key={index} {...item} />
      ))}
    </div>
  );
};

export default CategoryProductManagerList;
