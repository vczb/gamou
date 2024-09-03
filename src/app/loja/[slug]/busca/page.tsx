import { CategoryProductListProps } from "@/components/CategoryProductList";
import Search, { SearchProps } from "@/containers/Search";
import { getStoreBySlug } from "@/controllers/store";
import { getInventoryByCompanySlug } from "@/models/store";

const Index = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | undefined };
}) => {
  const slug = params.slug;
  const query = searchParams?.q || "";

  const data = await getStoreBySlug({ slug });

  const { category_product_list } = data;

  const categoryProductList =
    category_product_list as unknown as CategoryProductListProps[];

  const filteredCategoryProductList = categoryProductList
    .map((item) => {
      const filteredProducts = item.products.filter((product) =>
        product.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      );

      if (
        item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()) ||
        filteredProducts.length > 0
      ) {
        return {
          ...item,
          products:
            filteredProducts.length > 0 ? filteredProducts : item.products,
        };
      }

      return null;
    })
    .filter(Boolean);

  const props = {
    slug,
    query,
    categoryProductList: filteredCategoryProductList,
  } as unknown as SearchProps;

  return <Search {...props} />;
};
export default Index;
