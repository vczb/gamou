"use client";

import Avatar from "@/components/Avatar";

import Heading from "@/components/Heading";
import SearchField from "@/components/SearchField";
import CategoryMenu from "@/components/CategoryMenu";
import { CategoryLinkProps } from "@/components/CategoryLink";
import CartButton from "@/components/CartButton";
import CategoryProductList, {
  CategoryProductListProps,
} from "@/components/CategoryProductList";
import { useMemo, useState } from "react";

export type StoreProps = {
  image: string;
  name: string;
  categories: CategoryLinkProps[];
  categoryProductList: CategoryProductListProps[];
};

export default function Store({
  image,
  name,
  categories,
  categoryProductList,
}: StoreProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProductList = useMemo(() => {
    const filtered = categoryProductList
      .map((category) => {
        const filteredProducts = category.products.filter((product) =>
          product.title
            .toLocaleLowerCase()
            .includes(searchTerm.toLocaleLowerCase())
        );

        if (
          category.name
            .toLocaleLowerCase()
            .includes(searchTerm.toLocaleLowerCase()) ||
          filteredProducts.length > 0
        ) {
          return {
            ...category,
            products:
              filteredProducts.length > 0
                ? filteredProducts
                : category.products,
          };
        }

        return null;
      })
      .filter(Boolean); // Remove null entries

    return filtered as CategoryProductListProps[];
  }, [searchTerm, categoryProductList]);

  return (
    <main className="container mx-auto px-4 pb-28">
      <section className="mt-32 mb-6 flex items-center justify-center">
        <Avatar src={image} alt={name} />
      </section>
      <section className="text-center mb-6">
        <Heading text={name} />
        {/* <div className="flex justify-between mt-3">
          <p className="text-small">
            <span className="text-primary-500 font-bold">Aberto</span> até 23:00
          </p>
        </div> */}
      </section>
      <section className="mb-6">
        <SearchField
          placeholder={`${
            searchTerm
              ? "Você buscou por: " + searchTerm + ""
              : "Buscar por nome..."
          }`}
          handleSearch={(value) => setSearchTerm(value)}
        />
      </section>

      {!searchTerm && (
        <section className="mb-6 flex items-center justify-center">
          <CategoryMenu categories={categories} />
        </section>
      )}

      <section className="mb-6 text-center">
        <ul className="w-full max-w-4xl mx-auto">
          {filteredProductList.length ? (
            filteredProductList.map((item) => (
              <li className="mb-6" key={item.uid}>
                <CategoryProductList {...item} />
              </li>
            ))
          ) : (
            <></>
          )}
        </ul>
      </section>
      <CartButton />
    </main>
  );
}
