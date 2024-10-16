import { Product as ProductTypes } from "@/types/product";
import Product from "../Product";

export type ProductListProps = {
  products: ProductTypes[];
};

const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="grid gap-4">
      {products.map((product) => (
        <div
          className="mb-4 pb-4 border-b-2 border-dashed border-blueGray-200 last:border-none last:mb-0 last:pb-0"
          key={product.id}
        >
          <Product {...product} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
