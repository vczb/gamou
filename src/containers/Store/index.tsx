import Avatar from "@/components/Avatar";
import Heading from "@/components/Heading";
import SearchField from "@/components/SearchField";
import CategoryMenu from "@/components/CategoryMenu";
import CartButton from "@/components/CartButton";
import { Category } from "@/types/category";
import { Company } from "@/types/company";
import { Product as ProductType } from "@/types/product";
import Accordion from "@/components/Accordion";
import Product from "@/components/Product";

export type StoreProps = {
  company: Company;
  products: ProductType[];
  categories: Category[];
};

export default function Store({ company, products, categories }: StoreProps) {
  return (
    <main className="container mx-auto px-4 pb-28">
      <section className="mt-32 mb-6 flex items-center justify-center">
        <Avatar src={company?.image || ""} alt={company?.name || ""} />
      </section>
      <section className="text-center mb-6">
        <Heading text={company.name} />
        {/* <div className="flex justify-between mt-3">
          <p className="text-small">
            <span className="text-primary-500 font-bold">Aberto</span> até 23:00
          </p>
        </div> */}
      </section>
      <section className="mb-6">
        <SearchField
          searchPath={`/loja/${company.slug}/busca`}
          placeholder="Buscar por nome..."
        />
      </section>

      <section className="mb-6 flex items-center justify-center">
        <CategoryMenu
          categories={categories.filter((category) =>
            products.find((product) => product.category_id === category.id)
          )}
        />
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
                Não há produtos disponíveis no momento
              </p>
            </div>
          )}
        </ul>
      </section>
      <CartButton />
    </main>
  );
}
