"use client";

import Breadcrumb from "@/components/Breadcrumb";
import Button from "@/components/Button";
import DynamicForm, { FieldFormSchema } from "@/components/DynamicForm";
import { editCategoryProps, useCategory } from "@/hooks/use-category";
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

  const { createOrEditCategory, deleteCategory, loading } = useCategory();

  const formData = useMemo(() => {
    console.log("category", category);
    return [
      {
        name: "title",
        label: "Título:",
        placeholder: "Digite o título da categoria",
        type: "text",
        defaultValue: category?.title,
        editable: true,
        required: true,
        disabled: loading,
      },
      {
        name: "image",
        label: "Imagem:",
        placeholder: "Digite a URL da imagem",
        type: "upload-image",
        defaultValue: category?.image,
        editable: true,
        required: action === "create" ? true : false,
        disabled: loading,
        className: "w-full max-h-52",
      },
      {
        name: "description",
        label: "Descrição:",
        placeholder: "Digite a descrição da categoria",
        type: "description",
        defaultValue: category?.description,
        editable: true,
        required: true,
        disabled: loading,
      },
      {
        name: "active",
        label: "Ativa:",
        type: "checkbox",
        checked:
          typeof category?.active !== "undefined" ? category.active : true,
        editable: true,
        required: false,
        disabled: loading,
      },
    ] as unknown as FieldFormSchema[];
  }, [category, loading, action]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);

      const imageFile = formData.get("image");
      const imageSrc = formData.get("image-src");
      // @ts-ignore
      const image = imageFile?.size > 0 ? imageFile : imageSrc;

      const title = (formData.get("title") || "") as string;
      const description = (formData.get("description") || "") as string;
      const active = formData.get("active") === "on";

      const payload = {
        ...category,
        title,
        image,
        description,
        active,
      } as editCategoryProps;

      await createOrEditCategory(payload, action);
    },
    [createOrEditCategory, action, category]
  );

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
        <DynamicForm
          formId="category-form"
          schema={formData}
          onSubmit={handleSubmit}
          btnProps={{
            text: loading
              ? "Processando..."
              : action === "create"
              ? "Criar categoria"
              : "Atualizar categoria",
            variant: "secondary",
            disabled: loading,
          }}
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
            Deletar categoria
          </Button>
        </div>
      )}
    </div>
  );
};

export default Category;
