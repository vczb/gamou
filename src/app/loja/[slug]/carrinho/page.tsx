import Cart from "@/containers/Cart";

const Index = ({ params }: { params: { slug: string } }) => {
  return <Cart {...params} />;
};
export default Index;
