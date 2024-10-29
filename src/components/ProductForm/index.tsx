import { editProductProps, useProduct } from "@/hooks/use-product";
import { useCallback, useMemo } from "react";
import { Product as ProductTypes } from "@/types/product";
import { Category } from "@/types/category";
import DynamicForm, { FieldFormSchema } from "../DynamicForm";
import { DECIMAL_PATTERN } from "@/utils/regex";
import { AttributeVariantProps } from "../AttributeVariant";
import { AttributeItemProps } from "../AttributeItem";

export type ProductFormProps = {
  action: "create" | "edit";
  product?: Partial<ProductTypes>;
  categories: Category[];
  handleSubmit?: (product?: ProductTypes) => void;
};

const ProductForm = ({
  product,
  action,
  categories,
  handleSubmit,
}: ProductFormProps) => {
  const { createOrEditProduct, loading } = useProduct();

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
        sublabel: "Este é o nome do seu produto",
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
        sublabel:
          "Escolha uma imagem na horientação horizontal de até 1MB (1000KB)",
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
        sublabel: "Descreva seu produto em detalhes",
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
        sublabel:
          "Digite o preço do produto. Apenas números inteiros ou decimais",
        placeholder: "99,99",
        type: "text-number",
        defaultValue: product?.price,
        pattern: DECIMAL_PATTERN.source,
        helperText:
          "O valor deve ser em formato decimal ou inteiro separado por virgula ou ponto. Exemplo 99,99",
        editable: true,
        required: true,
        disabled: loading,
        step: ".01",
      },
      // {
      //   name: "amount",
      //   label: "Quantidade:",
      //   sublabel:
      //     "Você pode digitar no centro do elemento ou somar e diminuir pelos botões",
      //   placeholder: "Digite a quantidade do produto",
      //   type: "number",
      //   defaultValue: product?.amount,
      //   editable: true,
      //   required: true,
      //   disabled: loading,
      // },
      {
        name: "category_id",
        label: "Categoria:",
        sublabel: "Sob qual categoria seu produto estará agrupado",
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
        name: "variants",
        label: "Opções:",
        sublabel: "Adicione opções de escolha ao seu produto. (opcional)",
        type: "variants",
        hidden: process.env.NODE_ENV === "production",
        variants: product?.variants || [],
      },
      {
        name: "active",
        label: "Ativo:",
        sublabel:
          "Ao marcar esta opção seu produto estará disponível no seu site",
        type: "checkbox",
        checked: typeof product?.active !== "undefined" ? product.active : true,
        editable: true,
        required: false,
        disabled: loading,
      },
    ] as unknown as FieldFormSchema[];
  }, [product, loading, action, categories]);

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
      const price = parseFloat(formData.get("price") as string);
      const amount = formData.get("amount") as unknown as number;
      const category_id = parseInt(formData.get("category_id") as string, 10);
      const active = formData.get("active") === "on";

      let attributeVariants: AttributeVariantProps[] = [];

      for (let variantAttributeCount = 0; ; variantAttributeCount++) {
        const title = formData.get(
          `attribute-${variantAttributeCount}-title`
        ) as string;
        if (!title) break;

        const isRequired = formData.has(
          `attribute-${variantAttributeCount}-required`
        );
        const isMultiple = formData.has(
          `attribute-${variantAttributeCount}-multiple`
        );

        const variantItems: AttributeItemProps[] = [];
        for (let variantItemCount = 0; ; variantItemCount++) {
          const itemName = formData.get(
            `attribute-${variantAttributeCount}-item-${variantItemCount}`
          ) as string;
          if (!itemName) break;

          variantItems.push({ name: itemName });
        }

        attributeVariants.push({
          title,
          isMultiple,
          isRequired,
          variants: variantItems,
        });
      }

      const payload = {
        ...product,
        title,
        image,
        description,
        price,
        amount,
        category_id,
        active,
        variants: attributeVariants,
      } as editProductProps;

      const data = await createOrEditProduct(payload, action);

      handleSubmit?.(data?.product);
    },
    [createOrEditProduct, action, product, handleSubmit]
  );

  // const handleDelete = useCallback(async () => {
  //   if (!product?.id) return;

  //   if (
  //     window.confirm(
  //       `Você tem certeza que quer deletar este produto?\n\nEsta ação não pode ser desfeita!`
  //     )
  //   ) {
  //     await deleteProduct(product.id);
  //   }
  // }, [deleteProduct, product]);

  return (
    <DynamicForm
      formId="product-form"
      schema={formData}
      onSubmit={handleSubmitForm}
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
