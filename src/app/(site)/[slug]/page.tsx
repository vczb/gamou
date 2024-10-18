import { notFound } from "next/navigation";
import Store, { StoreProps } from "@/containers/Store";
import { StoreController } from "@/controllers/StoreController";
import { CompanyController } from "@/controllers/CompanyController";
import { BASE_URL } from "@/utils/constants";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;

  const controller = new CompanyController();

  const { data } = await controller.selectCompanyBySlug(slug);

  const company = data?.company;

  if (!company) {
    return;
  }

  const title = `${company.name} - Faça Seus Pedidos via WhatsApp em Segundos!`;
  const description =
    company.description ||
    `Descubra a praticidade de comprar online na ${company.name}! Faça seu pedido rápido e seguro, sem complicações.`;
  const imageUrl = company.image;
  const url = `${BASE_URL}/${company.slug}`;

  return {
    title,
    description,
    openGraph: {
      type: "website",
      url,
      title,
      description,
      images: [
        {
          url: imageUrl,
          alt: company.name,
        },
      ],
    },
    alternates: {
      canonical: url,
    },
  };
}

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
