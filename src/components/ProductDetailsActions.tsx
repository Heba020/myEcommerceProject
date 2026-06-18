"use client";

import { useQuery } from "@tanstack/react-query";

import ProductButton from "./ProductButton";
import CartCounterFull from "./CartCounterFull";

import { CartResponse }
from "../interfaces/cart.interface";

interface Props {
  productId: string;
}

export default function ProductDetailsActions({
  productId,
}: Props) {
  const { data: cart } =
    useQuery<CartResponse>({
      queryKey: ["cart"],

      queryFn: async () => {
        const res =
          await fetch("/api/cart");

        return res.json();
      },
    });

  const cartItem =
    cart?.data?.products?.find(
      (item) =>
        item.product._id === productId
    );

  if (cartItem) {
    return (
      <CartCounterFull
        productId={productId}
        count={cartItem.count}
      />
    );
  }

  return (
    <ProductButton id={productId} />
  );
}