import { notFound } from "next/navigation";
import Store, { StoreProps } from "@/containers/Store";
import { fetchStoreBySlug } from "@/controllers/store";

const Page = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;
  const { data } = await fetchStoreBySlug({ slug });
  const { categories, category_product_list, image, name } = data;

  const props = {
    slug,
    categories,
    categoryProductList: category_product_list,
    image,
    name,
  } as unknown as StoreProps;

  if (!props) {
    notFound();
  }

  return <Store {...props} />;
};

export default Page;
