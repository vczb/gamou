import { notFound } from "next/navigation";
import Search, { SearchProps } from "@/containers/Search";
import { groupProductsByCategory } from "@/utils/mappers";
import { StoreController } from "@/controllers/StoreController";

const Page = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | undefined };
}) => {
  const slug = params.slug;

  const query = searchParams?.q || "";

  const controller = new StoreController();

  const { data } = await controller.selectStoreBySlugAndQuery(slug, query);

  const { products, company, categories } = data;

  const categoryProductList = groupProductsByCategory(products);

  const props = {
    products,
    categories,
    categoryProductList,
    image: company.image,
    name: company.name,
    slug: company.slug,
  } as unknown as SearchProps;

  if (!props) {
    notFound();
  }

  return <Search {...props} />;
};

export default Page;
