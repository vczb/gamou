'use client'

import { useCart } from "@/hooks/use-cart";
import Button from "@/components/Button"
import { ProductProps } from "@/components/Product";

type AddToCartButton = {
  product: ProductProps
}

const AddToCartButton = ({product}: AddToCartButton) => {

  const { addToCart } = useCart();

  return <Button
  className="w-full self-end md:h-7"
  variant="secondary"
  onClick={() => addToCart(product)}
>
  Add to cart
</Button>
}

export default AddToCartButton