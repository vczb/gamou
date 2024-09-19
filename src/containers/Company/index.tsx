"use client";

import React, { useCallback, useMemo } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import DynamicForm, { FieldFormSchema } from "@/components/DynamicForm";
import { Company as CompanyType } from "@/types/company";

const BREADCRUMB = [
  { link: "/painel", label: "Painel" },
  { link: "/painel/loja", label: "Loja", active: true },
];

type CompanyProps = {
  company: CompanyType;
};

const Company = ({ company }: CompanyProps) => {
  const formData = useMemo(() => {
    const fields: FieldFormSchema[] = [
      {
        name: "name",
        label: "Loja:",
        placeholder: "Digite o nome da sua loja",
        type: "text",
        defaultValue: company?.name || "",
      },
      {
        name: "image",
        label: "Imagem",
        type: "upload-image",
        defaultValue: company?.image || "",
      },
      {
        name: "description",
        label: "Descrição",
        placeholder: "Adicione uma breve descrição",
        type: "description",
        defaultValue: company?.description || "",
      },
      {
        name: "active",
        label: "Loja em atividade",
        checkboxLabel: "Sim",
        type: "checkbox",
        checked: typeof company?.active !== "undefined" ? company.active : true,
      },
      {
        name: "currency",
        label: "Moeda",
        type: "select",
        defaultValue: company?.currency || "brl",
        selectOptions: [
          { value: "brl", label: "BRL" },
          { value: "eur", label: "EUR" },
        ],
      },
    ];

    return fields;
  }, [company]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);

      const data = {
        name: formData.get("name") as string,
        image: formData.get("image") as string,
        description: formData.get("description") as string,
        active: formData.get("active") === "on",
        currency: (formData.get("currency") || "brl") as string,
      };

      console.log(data);

      // Perform form submission logic here
    },
    []
  );

  return (
    <div className="container mx-auto px-4 pb-28 pt-8 max-w-lg">
      <Breadcrumb items={BREADCRUMB} />
      <div className="mt-4">
        <DynamicForm
          headingText="Minha loja"
          formId="profile-form"
          schema={formData}
          onSubmit={handleSubmit}
          btnProps={{
            text: "Salvar",
          }}
        />
      </div>
    </div>
  );
};

export default Company;
