"use client";

import Breadcrumb from "@/components/Breadcrumb";
import Button from "@/components/Button";
import ProductForm from "@/components/ProductForm";
import { useProduct } from "@/hooks/use-product";
import { Category } from "@/types/category";
import { Product as ProductTypes } from "@/types/product";
import { useCallback, useMemo } from "react";

type ProductProps = {
  action: "create" | "edit";
  product?: ProductTypes;
  categories: Category[];
};

const Product = ({ product, action, categories }: ProductProps) => {
  const breadcrumb = useMemo(
    () => [
      { link: "/painel", label: "Painel" },
      { link: "/painel/estoque", label: "Estoque" },
      { link: "/painel/estoque/produtos", label: "Produtos" },
      {
        link: "/painel/estoque/produtos/novo",
        label: action === "create" ? "Novo" : "Editar",
        active: true,
      },
    ],
    [action]
  );

  const { deleteProduct, loading } = useProduct();

  const handleDelete = useCallback(async () => {
    if (!product?.id) return;

    if (
      window.confirm(
        `Você tem certeza que quer deletar este produto?\n\nEsta ação não pode ser desfeita!`
      )
    ) {
      await deleteProduct(product.id);
    }
  }, [deleteProduct, product]);

  return (
    <div className="container mx-auto px-4 pb-28 pt-8 max-w-lg">
      <Breadcrumb items={breadcrumb} />
      <div className="mt-4">
        <ProductForm
          categories={categories}
          product={product}
          action={action}
        />
      </div>
      {action === "edit" && (
        <div className="mt-4 text-end" id="deletar">
          <Button
            variant="light"
            type="button"
            size="small"
            onClick={handleDelete}
            disabled={loading}
          >
            Deletar produto
          </Button>
        </div>
      )}
    </div>
  );
};

export default Product;
