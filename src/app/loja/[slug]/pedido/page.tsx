import Order from "@/containers/Order";

const Index = ({ params }: { params: { slug: string } }) => {
  return <Order {...params} />;
};
export default Index;
