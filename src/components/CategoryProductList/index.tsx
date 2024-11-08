import { Product as ProductTypes } from "@/types/product";
import Accordion from "../Accordion";
import { CompanySettingsProvider } from "@/hooks/use-company";
import { Company } from "@/types/company";
import { Category } from "@/types/category";
import Product from "../Product";

export type CategoryProductListProps = {
  products: ProductTypes[];
  products_has_variants?: boolean;
  categories: Category[];
};

const CategoryProductList = ({
  products_has_variants,
  categories,
  products,
}: CategoryProductListProps) => {
  return (
    <CompanySettingsProvider products_has_variants={products_has_variants}>
      <ul className="w-full max-w-4xl mx-auto">
        {categories.length ? (
          categories.map(
            (category) =>
              products.find(
                (product) => product.category_id === category.id
              ) && (
                <li className="mb-6" key={category.id}>
                  <div id={String(category.id)}>
                    <Accordion
                      title={category.title}
                      detailsClassName="w-full w-full max-w-4xl"
                    >
                      <div className="grid gap-4">
                        {products
                          .filter(
                            (product) => product.category_id === category.id
                          )
                          .map((product) => (
                            <div
                              className="mb-4 pb-4 border-b-2 border-dashed border-blueGray-200 last:border-none last:mb-0 last:pb-0"
                              key={product.id}
                            >
                              <Product {...product} />
                            </div>
                          ))}
                      </div>
                    </Accordion>
                  </div>
                </li>
              )
          )
        ) : (
          <div className="flex justify-center items-center m-auto w-full text-center">
            <p className="text-blueGray-600">
              Não há produtos disponíveis no momento
            </p>
          </div>
        )}
      </ul>
    </CompanySettingsProvider>
  );
};

export default CategoryProductList;
