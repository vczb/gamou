"use client";

import Breadcrumb from "@/components/Breadcrumb";

const BREADCUMB = [
  { link: "/painel", label: "Painel" },
  { link: "/painel/loja", label: "Loja", active: true },
];
const Company = () => {
  return (
    <div className="container mx-auto px-4 pb-28 pt-8 max-w-lg">
      <Breadcrumb items={BREADCUMB} />
    </div>
  );
};

export default Company;
