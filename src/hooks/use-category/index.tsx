"use client";

import { Category } from "@/types/category";
import renderFlashMessage from "@/utils/renderFlashMessage";
import { ReactNode, useCallback, useState, createContext } from "react";
import { useUser } from "../use-user";
import { BASE_URL } from "@/utils/constants";

export type editCategoryProps = {
  image?: File;
} & Category;

const useCategory = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const { user } = useUser();

  const createOrEditCategory = useCallback(
    async (
      category: editCategoryProps,
      action: "create" | "edit" = "create"
    ) => {
      setLoading(true);
      try {
        const upload_url = BASE_URL + "/api/upload";
        const update_url = BASE_URL + "/api/categories";

        if (!BASE_URL) {
          throw new Error("variável BASE_URL não pode ser nula");
        }

        if (!user) {
          throw new Error("Não foi possível identificar o usuário");
        }

        let imagePath = category.image;

        // @ts-ignore
        if (category.image instanceof File) {
          const formData = new FormData();

          const fileName = `category-${Date.now()}`;

          formData.append("file", category.image, fileName);

          const upload = await fetch(upload_url, {
            method: "POST",
            body: formData,
          });

          const uploadResult = await upload.json();

          const path = uploadResult.filePath.replace(/.*\/(uploads\/)/, "/$1");
          imagePath = path;
        }

        const method = action === "create" ? "POST" : "PUT";

        const response = await fetch(update_url, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...category, image: imagePath }),
        });

        const result = await response.json();

        if (response.status !== 200) {
          throw new Error(result?.message);
        }

        const updatedCategory = result?.data?.category;

        renderFlashMessage({ message: result.message, variant: "success" });

        return {
          category: updatedCategory,
        };
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

  const deleteCategory = useCallback(async (categoryId: number) => {
    setLoading(true);
    setError(undefined);

    try {
      if (!categoryId) {
        throw new Error("Não foi possível processar dados da categoria");
      }

      if (!BASE_URL) {
        throw new Error("variável BASE_URL não pode ser nula");
      }

      const url = `${BASE_URL}/api/categories/${categoryId}`;

      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const dataJson = await response.json();

      if (response.status !== 200) {
        throw new Error(dataJson?.message);
      }

      renderFlashMessage({ message: dataJson.message, variant: "success" });
    } catch (error: any) {
      setError(error);
      renderFlashMessage({ message: error.message, variant: "alert" });
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    deleteCategory,
    createOrEditCategory,
    loading,
    error,
  };
};

type CategoryContextData = {
  categories: Category[];
};

const CategoryContextDefaultValues = {
  categories: [],
};

const CategoryContext = createContext<CategoryContextData>(
  CategoryContextDefaultValues
);

const CategoryProvider = ({
  children,
  categories,
}: {
  children: ReactNode;
  categories: Category[];
}) => {
  return (
    <CategoryContext.Provider value={{ categories }}>
      {children}
    </CategoryContext.Provider>
  );
};

export { useCategory, CategoryProvider, CategoryContext };
