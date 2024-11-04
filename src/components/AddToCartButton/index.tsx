"use client";

import { useCart } from "@/hooks/use-cart";
import Button from "@/components/Button";
import { ProductProps } from "@/components/Product";
import { useCallback, useState } from "react";
import Modal from "../Modal";
import AttributeForm from "../AttributeForm";
import { generateFNV1aHash } from "@/utils/criptography/common";

type AddToCartButton = {
  product: ProductProps;
};

const AddToCartButton = ({ product }: AddToCartButton) => {
  const [openModal, setOpenModal] = useState(false);
  const { addToCart } = useCart();

  return (
    <>
      <Button
        className="w-full self-end md:h-7"
        variant="secondary"
        onClick={
          product.variants?.length
            ? () => setOpenModal(true)
            : () => addToCart(product)
        }
      >
        Adicionar ao carrinho
      </Button>
      <Modal
        isOpen={openModal}
        showCloseButton={true}
        onClose={() => setOpenModal(false)}
      >
        <div className="py-12">
          <AttributeForm
            formId={`variant-form-${product.id}`}
            variants={product.variants}
            onSubmit={(data) => {
              addToCart({
                ...product,
                id: product.id + generateFNV1aHash(JSON.stringify(data)),
                selectedVariants: data,
              });

              setOpenModal(false);

              return;
            }}
          />
        </div>
      </Modal>
    </>
  );
};

export default AddToCartButton;
