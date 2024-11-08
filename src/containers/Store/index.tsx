import Avatar from "@/components/Avatar";
import Heading from "@/components/Heading";
import SearchField from "@/components/SearchField";
import CategoryMenu from "@/components/CategoryMenu";
import CartButton from "@/components/CartButton";
import { Category } from "@/types/category";
import { Company } from "@/types/company";
import { Product as ProductType } from "@/types/product";
import CategoryProductList from "@/components/CategoryProductList";

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
          searchPath={`/${company.slug}/busca`}
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
        <CategoryProductList
          categories={categories}
          products_has_variants={company?.products_has_variants}
          products={products}
        />
      </section>
      <CartButton />
    </main>
  );
}
