"use client";

import Avatar, { AvatarProps } from "@/components/Avatar";

import data from "@/__mock__/data";
import Heading from "@/components/Heading";
import SearchField from "@/components/SearchField";
import CategoryMenu from "@/components/CategoryMenu";
import { CategoryLinkProps } from "@/components/CategoryLink";
import CategoryProductList, {
  CategoryProductListProps,
} from "@/components/CategoryProductList";
import CartButton from "@/components/CartButton";
import { useCompany } from "@/hooks/use-company";

type Home = {
  avatar: AvatarProps;
  company: any;
  categories: CategoryLinkProps[];
  category_product_list: CategoryProductListProps[];
};

export default function Home() {
  const { categories, category_product_list: categoryProductList } =
    data as unknown as Home;

  const { company } = useCompany();

  return (
    <main className="container mx-auto px-4 pb-14">
      <section className="mt-32 mb-6 flex items-center justify-center">
        <Avatar src={company.image} alt={company.name} />
      </section>
      <section className="text-center mb-6">
        <Heading text={company.name} />
        <div className="flex justify-between mt-3">
          <p className="text-small">
            <span className="text-primary-500 font-bold">Open</span> until 11 PM
          </p>
        </div>
      </section>
      <section className="mb-6">
        <SearchField placeholder="Seach by name..." />
      </section>
      <section className="mb-6 flex items-center justify-center">
        <CategoryMenu categories={categories} />
      </section>
      <section className="mb-6 text-center">
        <ul className="w-full max-w-4xl mx-auto">
          {categoryProductList.map((item) => (
            <li className="mb-6" key={item.uid}>
              <CategoryProductList {...item} />
            </li>
          ))}
        </ul>
      </section>
      <CartButton />
    </main>
  );
}
