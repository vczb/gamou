"use client";

import Breadcrumb from "@/components/Breadcrumb";
import Button from "@/components/Button";
import CategoryForm from "@/components/CategoryForm";
import { useCategory } from "@/hooks/use-category";
import { Category as CategoryTypes } from "@/types/category";
import { useCallback, useMemo } from "react";

type CategoryProps = {
  action: "create" | "edit";
  category?: CategoryTypes;
};

const Category = ({ category, action }: CategoryProps) => {
  const breadcrumb = useMemo(
    () => [
      { link: "/painel", label: "Painel" },
      { link: "/painel/estoque", label: "Estoque" },
      { link: "/painel/estoque/categorias", label: "Categorias" },
      {
        link: "/painel/estoque/categorias/adicionar",
        label: action === "create" ? "Adicionar" : "Editar",
        active: true,
      },
    ],
    [action]
  );

  const { deleteCategory, loading } = useCategory();

  const handleDelete = useCallback(async () => {
    if (!category?.id) return;

    if (
      window.confirm(
        `Você tem certeza que quer deletar esta categoria?\n\nEsta ação não pode ser desfeita!`
      )
    ) {
      await deleteCategory(category.id);
    }
  }, [deleteCategory, category]);

  return (
    <div className="container mx-auto px-4 pb-28 pt-8 max-w-lg">
      <Breadcrumb items={breadcrumb} />
      <div className="mt-4">
        <CategoryForm category={category} action={action} />
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
            Deletar categoria
          </Button>
        </div>
      )}
    </div>
  );
};

export default Category;
