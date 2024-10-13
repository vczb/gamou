import { editProductProps, useProduct } from "@/hooks/use-product";
import { useCallback, useMemo } from "react";
import { Product as ProductTypes } from "@/types/product";
import { Category } from "@/types/category";
import DynamicForm, { FieldFormSchema } from "../DynamicForm";

export type ProductFormProps = {
  action: "create" | "edit";
  product?: ProductTypes;
  categories: Category[];
};

const ProductForm = ({ product, action, categories }: ProductFormProps) => {
  const { createOrEditProduct, deleteProduct, loading } = useProduct();

  const formData = useMemo(() => {
    const selectOptions =
      categories?.map((category) => {
        return {
          label: category.title,
          value: category.id,
        };
      }) || [];

    return [
      {
        name: "title",
        label: "Título:",
        placeholder: "Digite o título do produto",
        type: "text",
        defaultValue: product?.title,
        editable: true,
        required: true,
        disabled: loading,
      },
      {
        name: "image",
        label: "Imagem:",
        placeholder: "Digite a URL da imagem",
        type: "upload-image",
        defaultValue: product?.image,
        editable: true,
        required: action === "create" ? true : false,
        disabled: loading,
        className: "w-full max-h-52",
      },
      {
        name: "description",
        label: "Descrição:",
        placeholder: "Digite a descrição do produto",
        type: "description",
        defaultValue: product?.description,
        editable: true,
        required: true,
        disabled: loading,
      },
      {
        name: "price",
        label: "Preço:",
        placeholder: "Digite o preço do produto",
        type: "text-number",
        defaultValue: product?.price,
        editable: true,
        required: true,
        disabled: loading,
        step: ".01",
      },
      {
        name: "amount",
        label: "Quantidade:",
        placeholder: "Digite a quantidade do produto",
        type: "text-number",
        defaultValue: product?.amount,
        editable: true,
        required: true,
        disabled: loading,
        step: "1",
      },
      {
        name: "category_id",
        label: "Categoria:",
        placeholder: "Selecione a categoria do produto",
        type: "select",
        defaultValue: product?.category_id,
        editable: true,
        required: true,
        disabled: loading,
        selectOptions: [
          { label: "Selecione a Categoria", value: "" },
          ...selectOptions,
        ],
      },
      {
        name: "active",
        label: "Ativo:",
        type: "checkbox",
        checked: typeof product?.active !== "undefined" ? product.active : true,
        editable: true,
        required: false,
        disabled: loading,
      },
    ] as unknown as FieldFormSchema[];
  }, [product, loading, action, categories]);

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
      const price = parseFloat(formData.get("price") as string);
      const amount = parseInt(formData.get("amount") as string, 10);
      const category_id = parseInt(formData.get("category_id") as string, 10);
      const active = formData.get("active") === "on";

      const payload = {
        ...product,
        title,
        image,
        description,
        price,
        amount,
        category_id,
        active,
      } as editProductProps;

      await createOrEditProduct(payload, action);
    },
    [createOrEditProduct, action, product]
  );

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
    <DynamicForm
      formId="product-form"
      schema={formData}
      onSubmit={handleSubmit}
      btnProps={{
        text: loading
          ? "Processando..."
          : action === "create"
          ? "Criar produto"
          : "Atualizar produto",
        variant: "secondary",
        disabled: loading,
      }}
    />
  );
};

export default ProductForm;
