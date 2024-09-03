import CartButton from "@/components/CartButton";
import CategoryProductList, {
  CategoryProductListProps,
} from "@/components/CategoryProductList";
import GoBackLink from "@/components/GoBackLink";
import Heading from "@/components/Heading";
import SearchField from "@/components/SearchField";

export type SearchProps = {
  slug: string;
  query: string;
  categoryProductList: CategoryProductListProps[];
};

const Search = ({ slug, query, categoryProductList }: SearchProps) => {
  return (
    <main className="container mx-auto px-4 pb-28">
      <div className="my-6">
        <GoBackLink path={`/loja/${slug}`} text="Retornar para a loja" />
      </div>
      <section className="mb-6">
        <SearchField
          searchPath={`/loja/${slug}/busca`}
          placeholder="Buscar por nome..."
        />
      </section>
      <section className="mb-6 flex items-center">
        <p>Você buscou por:</p>
        <b className="ml-2">{query}</b>
      </section>
      <section className="mb-6 text-center">
        <ul className="w-full max-w-4xl mx-auto">
          {categoryProductList.length ? (
            categoryProductList.map((item) => (
              <li className="mb-6" key={item.uid}>
                <CategoryProductList {...item} />
              </li>
            ))
          ) : (
            <div className="flex justify-center items-center m-auto w-full text-center">
              <p className="text-blueGray-600">
                Não há resultados para esta busca.
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
