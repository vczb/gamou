import Accordion from "@/components/Accordion";
import CartButton from "@/components/CartButton";
import GoBackLink from "@/components/GoBackLink";
import Product from "@/components/Product";
import SearchField from "@/components/SearchField";
import { Category } from "@/types/category";
import { Company } from "@/types/company";
import { Product as ProductType } from "@/types/product";

export type SearchProps = {
  query: string;
  company: Company;
  products: ProductType[];
  categories: Category[];
};

const Search = ({ company, categories, products, query }: SearchProps) => {
  return (
    <main className="container mx-auto px-4 pb-28">
      <div className="my-6">
        <GoBackLink path={`/${company.slug}`} text="Retornar para a loja" />
      </div>
      <section className="mb-6">
        <SearchField
          searchPath={`/${company.slug}/busca`}
          placeholder="Buscar por nome..."
        />
      </section>
      <section className="mb-6 flex items-center">
        <p>Você buscou por:</p>
        <b className="ml-2">{query}</b>
      </section>
      <section className="mb-6 text-center">
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
                Não há resultados para esta busca
              </p>
            </div>
          )}
        </ul>
      </section>
      <CartButton />
    </main>
  );
};

export default Search;
