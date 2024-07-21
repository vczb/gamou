import Home, { HomeProps } from "@/containers/Home";
import data from "@/__mock__/data";

export default function Index() {

  const { categories, category_product_list, company} = data;

  const props = {
    categories,
    categoryProductList: category_product_list,
    company
  }  as unknown as HomeProps

  return <Home {...props} />;
}
