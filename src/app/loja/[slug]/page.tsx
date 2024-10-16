import { notFound } from "next/navigation";
import Store, { StoreProps } from "@/containers/Store";
import { StoreController } from "@/controllers/StoreController";

const Page = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;

  const controller = new StoreController();

  const { data } = await controller.selectStoreBySlug(slug);

  if (!data) {
    notFound();
  }

  const { products, company, categories } = data;

  const props = {
    products,
    categories,
    company,
  } as unknown as StoreProps;

  return <Store {...props} />;
};

export default Page;
