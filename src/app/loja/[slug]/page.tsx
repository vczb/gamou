import { notFound } from 'next/navigation';
import Store, { StoreProps } from "@/containers/Store";
import { getStoreBySlug } from '@/controllers/store';

const Page = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug
  const data = await getStoreBySlug({slug})
  const { categories, category_product_list, image, name } = data;

  const props = {
    categories,
    categoryProductList: category_product_list,
    image, 
    name
  } as unknown as StoreProps;

  if (!props) {
    notFound();
  }

  return <Store {...props} />;
};

export default Page;
