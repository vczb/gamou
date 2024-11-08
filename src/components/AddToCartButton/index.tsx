"use client";

import { useCart } from "@/hooks/use-cart";
import Button from "@/components/Button";
import { ProductProps } from "@/components/Product";
import { useCallback, useContext, useState } from "react";
import Modal from "../Modal";
import AttributeForm from "../AttributeForm";
import { generateFNV1aHash } from "@/utils/criptography/common";
import { CompanySettingsContext } from "@/hooks/use-company";

type AddToCartButton = {
  product: ProductProps;
};

const AddToCartButton = ({ product }: AddToCartButton) => {
  const [openModal, setOpenModal] = useState(false);
  const { addToCart } = useCart();
  const { products_has_variants } = useContext(CompanySettingsContext);

  return (
    <>
      <Button
        className="w-full self-end md:h-7"
        variant="secondary"
        onClick={
          products_has_variants && product.variants?.length
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
