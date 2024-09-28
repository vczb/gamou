"use client";

import Breadcrumb from "@/components/Breadcrumb";

const BREADCUMB = [
  { link: "/painel", label: "Painel" },
  { link: "/painel/estoque", label: "Estoque" },
  { link: "/painel/estoque/categorias", label: "Categorias", active: true },
];

const Categories = () => {
  return (
    <div className="container mx-auto px-4 pb-28 pt-8 max-w-lg">
      <Breadcrumb items={BREADCUMB} />
      <div className="mt-4"></div>
    </div>
  );
};

export default Categories;
