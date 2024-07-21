import Avatar from "@/components/Avatar";

import Heading from "@/components/Heading";
import SearchField from "@/components/SearchField";
import CategoryMenu from "@/components/CategoryMenu";
import { CategoryLinkProps } from "@/components/CategoryLink";
import CartButton from "@/components/CartButton";
import CategoryProductList from "@/components/CategoryProductList";

export type HomeProps = {
  company: any;
  categories: CategoryLinkProps[];
  categoryProductList: any[];
};

export default function Home({company, categories, categoryProductList }: HomeProps) {

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
