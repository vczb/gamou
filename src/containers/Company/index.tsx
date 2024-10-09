"use client";

import React, { useCallback, useMemo } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import DynamicForm, { FieldFormSchema } from "@/components/DynamicForm";
import { Company as CompanyType } from "@/types/company";
import { editCompanyProps, useCompany } from "@/hooks/use-company";
import { BASE_URL } from "@/utils/constants";

const BREADCRUMB = [
  { link: "/painel", label: "Painel" },
  { link: "/painel/loja", label: "Loja", active: true },
];

type CompanyProps = {
  company: CompanyType;
};

const Company = ({ company }: CompanyProps) => {
  const { editCompany, loading } = useCompany();

  const formData = useMemo(() => {
    const fields: FieldFormSchema[] = [
      {
        name: "site",
        label: "Site:",
        type: "link",
        target: "_blank",
        defaultValue: `${BASE_URL}/loja/${company?.slug}`,
        hidden: company.slug === String(company.user_id),
      },
      {
        name: "name",
        label: "Loja:",
        placeholder: "Digite o nome da sua loja",
        type: "text",
        required: true,
        defaultValue: company?.name || "",
      },
      {
        name: "phone",
        label: "WhatsApp:",
        placeholder: "Exemplo (pais/estado/número): 5551991901783",
        type: "text",
        required: true,
        defaultValue: company?.phone || "",
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

      const imageFile = formData.get("image");
      const imageSrc = formData.get("image-src");
      // @ts-ignore
      const image = imageFile?.size > 0 ? imageFile : imageSrc;

      const data = {
        ...company,
        name: formData.get("name") as string,
        phone: formData.get("phone") as string,
        image: image,
        description: formData.get("description") as string,
        active: formData.get("active") === "on",
        currency: (formData.get("currency") || "brl") as string,
      } as editCompanyProps;

      await editCompany(data);
    },

    [editCompany, company]
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
            disabled: loading,
          }}
        />
      </div>
    </div>
  );
};

export default Company;
