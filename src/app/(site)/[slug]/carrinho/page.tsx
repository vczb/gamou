import Cart from "@/containers/Cart";
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

  const title = `${company.name} - Seu carrinho`;
  const description = `Confira os produtos que você selecionou no carrinho da ${company.name} e continue para finalizar a compra.`;

  return {
    title,
    description,
    robots: {
      index: false,
      follow: false,
    },
  };
}

const Index = ({ params }: { params: { slug: string } }) => {
  return <Cart {...params} />;
};
export default Index;
