import { notFound } from "next/navigation";
import Search, { SearchProps } from "@/containers/Search";
import { StoreController } from "@/controllers/StoreController";
import { BASE_URL } from "@/utils/constants";
import { CompanyController } from "@/controllers/CompanyController";

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

  const title = `${company.name} - Encontre Produtos e Ofertas Incríveis`;
  const description =
    company.description ||
    `Pesquise e encontre os melhores produtos da ${company.name}. Aproveite preços especiais e faça seus pedidos diretamente pelo WhatsApp!`;

  const imageUrl = company.image;
  const url = `${BASE_URL}/${company.slug}/search`;

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

  const props = {
    products,
    categories,
    company,
    query,
  } as unknown as SearchProps;

  if (!props) {
    notFound();
  }

  return <Search {...props} />;
};

export default Page;
