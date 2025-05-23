"use client";

import { Company } from "@/types/company";
import renderFlashMessage from "@/utils/renderFlashMessage";
import { ReactNode, createContext, useCallback, useState } from "react";
import { useUser } from "../use-user";
import { BASE_URL } from "@/utils/constants";

export type editCompanyProps = {
  image?: File;
} & Company;

const useCompany = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const { user } = useUser();

  const editCompany = useCallback(
    async (company: editCompanyProps) => {
      setLoading(true);
      try {
        const upload_url = BASE_URL + "/api/upload";
        const update_url = BASE_URL + "/api/companies";

        if (!BASE_URL) {
          throw new Error("variável BASE_URL não pode ser nula");
        }

        if (!user) {
          throw new Error("Não foi possível identificar o usuário");
        }

        let imagePath = company.image;

        // @ts-ignore
        if (company.image instanceof File) {
          const formData = new FormData();
          const fileName = `company-${Date.now()}`;
          formData.append("file", company.image, fileName);

          const upload = await fetch(upload_url, {
            method: "POST",
            body: formData,
          });

          const uploadResult = await upload.json();

          const path = uploadResult.filePath.replace(/.*\/(uploads\/)/, "/$1");
          imagePath = path;
        }

        const response = await fetch(update_url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...company, image: imagePath }),
        });

        const result = await response.json();

        if (response.status !== 200) {
          throw new Error(result?.message);
        }

        renderFlashMessage({ message: result.message, variant: "success" });
      } catch (error: any) {
        setError(error);
        console.error(error);
        renderFlashMessage({ message: error.message, variant: "alert" });
      } finally {
        setLoading(false);
      }
    },
    [user]
  );

  return {
    editCompany,
    loading,
    error,
  };
};

const CompanySettingsContext = createContext<{
  products_has_variants?: boolean;
}>({ products_has_variants: false });

const CompanySettingsProvider = ({
  children,
  products_has_variants,
}: {
  children: ReactNode;
  products_has_variants?: boolean;
}) => {
  return (
    <CompanySettingsContext.Provider value={{ products_has_variants }}>
      {children}
    </CompanySettingsContext.Provider>
  );
};

export { useCompany, CompanySettingsContext, CompanySettingsProvider };
