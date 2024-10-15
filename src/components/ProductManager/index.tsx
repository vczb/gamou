import { CURRENCY } from "@/utils/constants";
import Image from "../Image";
import { Product } from "@/types/product";
import Button from "../Button";
import { useState } from "react";
import Modal from "../Modal";
import ProductForm from "../ProductForm";
import { Category } from "@/types/category";

export type ProductManagerProps = {
  product: Product;
  categories: Category[];
};

const ProductManager = ({ product, categories }: ProductManagerProps) => {
  const [productState, setProductState] = useState(product);
  const [open, setOpen] = useState(false);
  const { title, image, description, price, id, amount } = productState;

  const handleSubmitForm = (updatedProduct?: Product) => {
    if (updatedProduct) {
      setProductState(updatedProduct);
      setOpen(false);
    }
  };

  return (
    <>
      <Modal isOpen={open} onClose={() => setOpen(false)} showCloseButton>
        <ProductForm
          product={productState}
          action="edit"
          categories={categories}
          handleSubmit={handleSubmitForm}
        />
      </Modal>
      <div id={String(id)} className="grid gap-2 grid-cols-3">
        <Image src={image} alt={title} className="w-full h-auto object-cover" />
        <div className="flex flex-col col-span-2 justify-between">
          <h3 className="text-sm font-bold line-clamp-1">{title}</h3>
          <p className="text-gray-500 line-clamp-2 md:line-clamp-3 lg:line-clamp-none">
            {description}
          </p>
          <div className="flex gap-2">
            <p className="text-sm">
              Qtd: <b>{amount}</b>
            </p>
            <p className="text-sm">
              Preço:{" "}
              <b>
                {CURRENCY} {price}
              </b>
            </p>
          </div>
          <Button
            size="small"
            variant="secondary"
            onClick={() => setOpen(true)}
          >
            Gerenciar produto
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProductManager;
