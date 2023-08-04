import ProductList from "../ProductList";
import Accordion from "../Accordion";
import { ProductProps } from "../Product";

export type CategoryProductListProps = {
  uid: string;
  name: string;
  products: ProductProps[];
};

const CategoryProductList = ({
  uid,
  name,
  products,
}: CategoryProductListProps) => {
  return (
    <div id={uid}>
      <Accordion title={name} detailsClassName="w-full w-full max-w-4xl">
        <ProductList products={products} key={uid} />
      </Accordion>
    </div>
  );
};

export default CategoryProductList;
