import { editCategoryProps, useCategory } from "@/hooks/use-category";
import { Category as CategoryTypes } from "@/types/category";
import { useCallback, useMemo } from "react";
import DynamicForm, { FieldFormSchema } from "../DynamicForm";

export type CategoryFormProps = {
  action: "create" | "edit";
  category?: CategoryTypes;
  handleSubmit?: (category?: CategoryTypes) => void;
};

const CategoryForm = ({
  category,
  action,
  handleSubmit,
}: CategoryFormProps) => {
  const { createOrEditCategory, loading } = useCategory();

  const formData = useMemo(() => {
    return [
      {
        name: "title",
        label: "Título:",
        sublabel: "Este é o nome da sua categoria",
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
        sublabel:
          "Escolha uma imagem na horientação horizontal de até 1MB (1000KB)",
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
        sublabel: "Descreva sua categoria em detalhes",
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
        sublabel: "Marque ativa e esta categoria estará disponível em seu site",
        type: "checkbox",
        checked:
          typeof category?.active !== "undefined" ? category.active : true,
        editable: true,
        required: false,
        disabled: loading,
      },
    ] as unknown as FieldFormSchema[];
  }, [category, loading, action]);

  const handleSubmitForm = useCallback(
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

      const data = await createOrEditCategory(payload, action);

      handleSubmit?.(data?.category);
    },
    [createOrEditCategory, action, category, handleSubmit]
  );

  return (
    <DynamicForm
      formId="category-form"
      schema={formData}
      onSubmit={handleSubmitForm}
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
  );
};

export default CategoryForm;
