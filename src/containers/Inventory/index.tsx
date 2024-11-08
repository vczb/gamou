"use client";

import Breadcrumb from "@/components/Breadcrumb";
import Button from "@/components/Button";
import CategoryForm from "@/components/CategoryForm";
import CategoryProductManager from "@/components/CategoryProductManager";
import Modal from "@/components/Modal";
import { CategoryProvider } from "@/hooks/use-category";
import { CompanySettingsProvider } from "@/hooks/use-company";

import { Category } from "@/types/category";
import { Product } from "@/types/product";
import { useState } from "react";

const BREADCUMB = [
  { link: "/painel", label: "Painel" },
  { link: "/painel/estoque", label: "Estoque", active: true },
];

type InventoryProps = {
  categories: Category[];
  products: Product[];
  products_has_variants?: boolean;
};

const Inventory = ({
  categories,
  products,
  products_has_variants,
}: InventoryProps) => {
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [categoriesState, setCategoriesState] = useState(categories);

  const handleCreateCategory = (newCategory?: Category) => {
    setCategoryModalOpen(false);
    if (newCategory) {
      setCategoriesState((prev) => [...prev, newCategory]);
    }
  };
  return (
    <>
      <Modal
        isOpen={categoryModalOpen}
        onClose={() => setCategoryModalOpen(false)}
        showCloseButton
      >
        <CategoryForm action="create" handleSubmit={handleCreateCategory} />
      </Modal>
      <div className="container mx-auto px-4 pb-28 pt-8 max-w-lg">
        <Breadcrumb items={BREADCUMB} />
        <div className="mt-4 text-end">
          <Button size="small" onClick={() => setCategoryModalOpen(true)}>
            Nova categoria
          </Button>
        </div>
        <div className="mt-4 grid gap-4">
          <CompanySettingsProvider
            products_has_variants={products_has_variants}
          >
            <CategoryProvider categories={categoriesState}>
              {categoriesState?.map((category) => (
                <CategoryProductManager
                  key={category.id}
                  category={category}
                  products={products.filter(
                    (product) => product.category_id === category.id
                  )}
                />
              ))}
            </CategoryProvider>
          </CompanySettingsProvider>
        </div>
      </div>
    </>
  );
};

export default Inventory;
