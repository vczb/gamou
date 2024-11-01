"use client";

import React, { useCallback, useMemo } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import DynamicForm, { FieldFormSchema } from "@/components/DynamicForm";
import { Company as CompanyType } from "@/types/company";
import { editCompanyProps, useCompany } from "@/hooks/use-company";
import { BASE_URL } from "@/utils/constants";
import { WHATSAPP_PATTERN } from "@/utils/regex";

const BREADCRUMB = [
  { link: "/painel", label: "Painel" },
  { link: "/painel", label: "Loja", active: true },
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
        sublabel: "Compartilhe este link com seus clientes",
        type: "link",
        target: "_blank",
        defaultValue: `${BASE_URL}/${company?.slug}`,
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
        sublabel:
          "Deve conter apenas números. Cód. do país, estado e telefone, totalizando 13 dígitos. Ex: 555199190178",
        placeholder: "Exemplo: 5551912345678",
        pattern: WHATSAPP_PATTERN.source,
        helperText: "O número deve seguir o padrão solicitado",
        type: "text",
        required: true,
        defaultValue: company?.phone || "",
      },
      {
        name: "image",
        label: "Imagem",
        sublabel: "Escolha uma imagem de até 1MB",
        type: "upload-image",
        defaultValue: company?.image || "",
      },
      {
        name: "description",
        label: "Descrição",
        // sublabel: "Máximo 255 caracteres",
        placeholder: "Adicione uma breve descrição",
        type: "description",
        // maxLength: 255,
        defaultValue: company?.description || "",
      },
      {
        name: "active",
        label: "Loja em atividade",
        sublabel:
          "Marque para garantir que sua loja esteja visível para seus clientes",
        checkboxLabel: "Sim",
        type: "checkbox",
        checked: typeof company?.active !== "undefined" ? company.active : true,
      },
      {
        name: "currency",
        label: "Moeda",
        type: "select",
        hidden: true,
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
      const image: File = imageFile?.size > 0 ? imageFile : imageSrc;

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
