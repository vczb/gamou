"use client";

import { Company } from "@/types/company";
import renderFlashMessage from "@/utils/renderFlashMessage";
import { useState } from "react";

const useCompany = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const editCompany = async (company: Company) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/companies", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(company),
      });

      const result = await response.json();

      if (response.status !== 200) {
        throw new Error(result?.message);
      }

      renderFlashMessage({ message: result.message, variant: "success" });
    } catch (error: any) {
      setError(error);
      renderFlashMessage({ message: error.message, variant: "alert" });
    } finally {
      setLoading(false);
    }
  };

  return {
    editCompany,
    loading,
    error,
  };
};

export { useCompany };
