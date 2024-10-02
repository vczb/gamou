import { notFound } from "next/navigation";
import Store, { StoreProps } from "@/containers/Store";
import { groupProductsByCategory } from "@/utils/mappers";
import { StoreController } from "@/controllers/StoreController";

const Page = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;

  const controller = new StoreController();

  const { data } = await controller.selectStoreBySlug(slug);

  if (!data) {
    notFound();
  }

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

  return <Store {...props} />;
};

export default Page;
