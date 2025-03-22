import Order from '@/containers/Order';
import { CompanyController } from '@/controllers/CompanyController';

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

  const title = `${company.name} - Confirme seu pedido`;
  const description = `Finalize seu pedido com segurança e rapidez na ${company.name}. Revise todos os detalhes antes de confirmar.`;

  return {
    title,
    description,
    robots: {
      index: false,
      follow: false,
    },
  };
}

const Index = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;

  const controller = new CompanyController();

  const { data } = await controller.selectCompanyBySlug(slug);

  const { company } = data;

  const phone = company.phone;
  const companyId = company.id;

  return <Order slug={slug} whatsapp={phone} companyId={companyId} />;
};
export default Index;
