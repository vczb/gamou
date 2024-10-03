"use client";

import { Product } from "@/types/product";
import renderFlashMessage from "@/utils/renderFlashMessage";
import { useCallback, useState } from "react";
import { useUser } from "../use-user";
import { BASE_URL } from "@/utils/constants";

export type editProductProps = {
  image?: File;
} & Product;

const useProduct = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [products, setProducts] = useState<Product[] | undefined>(undefined);
  const { user } = useUser();

  const createOrEditProduct = useCallback(
    async (product: editProductProps, action: "create" | "edit" = "create") => {
      setLoading(true);
      try {
        const upload_url = BASE_URL + "/api/upload";
        const update_url = BASE_URL + "/api/products";

        if (!BASE_URL) {
          throw new Error("variável BASE_URL não pode ser nula");
        }

        if (!user) {
          throw new Error("Não foi possível identificar o usuário");
        }

        let imagePath = product.image;

        // @ts-ignore
        if (product.image instanceof File) {
          const formData = new FormData();

          const fileName = product.id
            ? `product-${product.id}-image`
            : `product-${Date.now()}-temp-image`;

          formData.append("file", product.image, fileName);

          const upload = await fetch(upload_url, {
            method: "POST",
            body: formData,
            headers: {
              "user-id": String(user.id),
            },
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
          body: JSON.stringify({ ...product, image: imagePath }),
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

  const deleteProduct = useCallback(async (productId: number) => {
    setLoading(true);
    setError(undefined);

    try {
      if (!productId) {
        throw new Error("Não foi possível processar dados do produto");
      }

      if (!BASE_URL) {
        throw new Error("variável BASE_URL não pode ser nula");
      }

      const url = `${BASE_URL}/api/products/${productId}`;

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

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(undefined);

    try {
      if (!BASE_URL) {
        throw new Error("variável BASE_URL não pode ser nula");
      }

      const url = `${BASE_URL}/api/products`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const dataJson = await response.json();

      if (response.status !== 200) {
        throw new Error(dataJson?.message);
      }

      setProducts(dataJson.products);
    } catch (error: any) {
      setError(error);
      renderFlashMessage({ message: error.message, variant: "alert" });
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    deleteProduct,
    createOrEditProduct,
    fetchProducts,
    loading,
    error,
    products,
  };
};

export { useProduct };
