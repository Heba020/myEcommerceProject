"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { updateCart }
from "../apis/cart/update-cart.api";

import { DeleteItem }
from "../apis/cart/Delete-item.api";

interface CartCounterProps {
  productId: string;
  count: number;
}

export default function CartCounter({
  productId,
  count,
}: CartCounterProps) {
  const queryClient = useQueryClient();

  const {
    mutate: updateMutate,
    isPending,
  } = useMutation({
    mutationFn: updateCart,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });

  const {
    mutate: deleteMutate,
  } = useMutation({
    mutationFn: DeleteItem,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });

  function increase() {
    updateMutate({
      productId,
      count: count + 1,
    });
  }

  function decrease() {
    if (count <= 1) {
      deleteMutate(productId);
      return;
    }

    updateMutate({
      productId,
      count: count - 1,
    });
  }

  return (
    <div
      className="
        flex
        items-center
        justify-between

        bg-green-50
        border border-green-200

        rounded-xl

        px-3 py-2

        w-[140px]
        mx-auto
      "
    >
      <button
        onClick={decrease}
        disabled={isPending}
        className="
          w-8 h-8
          rounded-lg

          bg-white
          border border-green-300
cursor-pointer

          hover:bg-green-100
        "
      >
        -
      </button>

      <span
        className="
          font-bold
          text-green-600 pointer-events-none
        "
      >
        {isPending ? (
          <i className="fa-solid fa-spinner fa-spin" />
        ) : (
          count
        )}
      </span>

      <button
        onClick={increase}
        disabled={isPending}
        className="
          w-8 h-8
          rounded-lg
cursor-pointer
          bg-white
          border border-green-300

          hover:bg-green-100
        "
      >
        +
      </button>
    </div>
  );
}