import Order from "@/containers/Order";
import { CompanyController } from "@/controllers/CompanyController";

const Index = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;

  const controller = new CompanyController();

  const { data } = await controller.selectCompanyBySlug(slug);

  const { company } = data;

  const phone = company.phone;

  return <Order slug={slug} whatsapp={phone} />;
};
export default Index;
