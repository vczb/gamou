import { notFound } from "next/navigation";
import Store, { StoreProps } from "@/containers/Store";
import { fetchStoreBySlug } from "@/controllers/store";
import { groupProductsByCategory } from "@/utils/mappers";

// TODO: Optimize this
const Page = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;
  const { data } = await fetchStoreBySlug({ slug });

  const { products, company, categories } = data;

  const categoryProductList = groupProductsByCategory(products);

  const props = {
    products,
    categories,
    categoryProductList,
    image: company.image,
    name: company.name,
    slug: company.slug,
  } as unknown as StoreProps;

  if (!props) {
    notFound();
  }

  return <Store {...props} />;
};

export default Page;
