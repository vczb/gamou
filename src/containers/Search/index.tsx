import CartButton from "@/components/CartButton";
import CategoryProductList from "@/components/CategoryProductList";
import GoBackLink from "@/components/GoBackLink";
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
        <CategoryProductList
          categories={categories}
          products_has_variants={company?.products_has_variants}
          products={products}
        />
      </section>
      <CartButton />
    </main>
  );
};

export default Search;
