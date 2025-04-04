import { CURRENCY } from "@/utils/constants";
import Image from "../Image";
import { Product } from "@/types/product";
import Button from "../Button";
import { useCallback, useContext, useState } from "react";
import Modal from "../Modal";
import ProductForm from "../ProductForm";
import { Category } from "@/types/category";
import PenSquare from "@/icons/PenSquare";
import { useProduct } from "@/hooks/use-product";
import { CompanySettingsContext } from "@/hooks/use-company";

export type ProductManagerProps = {
  product: Product;
  categories: Category[];
};

const ProductManager = ({ product, categories }: ProductManagerProps) => {
  const [productState, setProductState] = useState<Product | undefined>(
    product
  );
  const [open, setOpen] = useState(false);

  const { deleteProduct, loading: productLoading } = useProduct();
  const { products_has_variants } = useContext(CompanySettingsContext);

  const handleSubmitForm = (updatedProduct?: Product) => {
    if (updatedProduct) {
      setProductState(updatedProduct);
      setOpen(false);
    }
  };

  const handleDeleteProduct = useCallback(
    async (categoryId: number) => {
      if (!categoryId) return;

      if (window.confirm(`Você tem certeza que quer deletar este produto?`)) {
        await deleteProduct(categoryId);
        setOpen(false);
        setProductState(undefined);
      }
    },
    [deleteProduct]
  );

  if (!productState) return;

  return (
    <>
      <Modal isOpen={open} onClose={() => setOpen(false)} showCloseButton>
        <ProductForm
          product={productState}
          action="edit"
          categories={categories}
          handleSubmit={handleSubmitForm}
          products_has_variants={products_has_variants}
        />
        <Button
          variant="light"
          type="button"
          size="small"
          className="flex ml-auto mt-2"
          onClick={() => handleDeleteProduct(productState.id)}
          disabled={productLoading}
        >
          Deletar produto
        </Button>
      </Modal>
      <div
        id={String(productState.id)}
        className={`grid md:gap-2 grid-cols-3 p-2 ${
          !productState.active && "bg-blueGray-200"
        }`}
      >
        <Image
          src={productState.image}
          alt={productState.title}
          className="w-20 h-20 md:w-32 md:h-32"
        />
        <div className="flex flex-col col-span-2 text-start justify-between md:ml-2">
          <div className="flex justify-between">
            <h3 className="text-sm font-bold line-clamp-1">
              {!productState.active && (
                <i className="text-xs mr-2 text-error">Desativado</i>
              )}
              {productState.title}
            </h3>
            <Button
              size="small"
              variant="secondary"
              onClick={() => setOpen(true)}
              className="ml-auto w-fit h-fit px-1 py-1"
            >
              <PenSquare className="h-3 w-3 md:h-4 md:w-4" />
            </Button>
          </div>
          <p className="text-gray-500 line-clamp-3 md:line-clamp-4 lg:line-clamp-none">
            {productState.description}
          </p>
          <div className="flex gap-2 mt-1">
            {/* <p className="text-sm">
              Qtd: <b>{productState.amount}</b>
            </p> */}
            <p className="text-sm">
              Preço:{" "}
              <b>
                {CURRENCY} {productState.price}
              </b>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductManager;
