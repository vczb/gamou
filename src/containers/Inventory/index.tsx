"use client";

// import Accordion from "@/components/Accordion";
import Breadcrumb from "@/components/Breadcrumb";
import CategoryProductManager from "@/components/CategoryProductManager";
import { CategoryProvider } from "@/hooks/use-category";
// import ControlCardList from "@/components/ControlCardList";
// import Box from "@/icons/Box";
// import Tags from "@/icons/Tags";
import { Category } from "@/types/category";
import { Product } from "@/types/product";

const BREADCUMB = [
  { link: "/painel", label: "Painel" },
  { link: "/painel/estoque", label: "Estoque", active: true },
];

// const CONTROL_ACTIONS = [
//   {
//     link: "/painel/estoque/categorias",
//     label: "Categorias",
//     icon: Tags,
//   },
//   {
//     link: "/painel/estoque/produtos",
//     label: "Produtos",
//     icon: Box,
//   },
// ];

type InventoryProps = {
  categories: Category[];
  products: Product[];
};

const Inventory = ({ categories, products }: InventoryProps) => {
  return (
    <div className="container mx-auto px-4 pb-28 pt-8 max-w-lg">
      <Breadcrumb items={BREADCUMB} />
      <div className="mt-4">
        <CategoryProvider categories={categories}>
          {categories.map((category) => (
            <CategoryProductManager
              key={category.id}
              category={category}
              products={products.filter(
                (product) => product.category_id === category.id
              )}
            />
          ))}
        </CategoryProvider>
        {/* <ControlCardList items={CONTROL_ACTIONS} /> */}
      </div>
    </div>
  );
};

export default Inventory;
