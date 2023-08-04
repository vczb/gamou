import CategoryProductList, {
  CategoryProductListProps,
} from "../CategoryProductList";

export type CatalogProps = {
  catalog: CategoryProductListProps[];
};

const Catalog = ({ catalog }: CatalogProps) => {
  return (
    <>
      {catalog.map((item) => (
        <div key={item.uid} className="mb-4 last:mb-0">
          <CategoryProductList {...item} />
        </div>
      ))}
    </>
  );
};

export default Catalog;
