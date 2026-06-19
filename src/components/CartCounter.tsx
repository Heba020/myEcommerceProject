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
        bg-green-100
        border-2 border-green-600
        rounded-xl
        w-[85%]
        mx-auto
        mb-2
        overflow-hidden
    "
    >
      <button
        onClick={decrease}
        disabled={isPending}
        className="
          w-10 h-9
          rounded-lg
          bg-white
          border-r-2 border-green-600 
          border-l-0
          cursor-pointer
        text-green-700
        font-bold
        hover:bg-green-200 
          transition-all duration-300  
    "
      >
        -
      </button>

      <span
        className="
          font-bold
          text-green-700 pointer-events-none
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
   w-10 h-9
          rounded-lg
          bg-white
          border-l-2 border-green-600 
          border-r-0
          cursor-pointer
        text-green-700
        font-bold
        hover:bg-green-200 
          transition-all duration-300  
        "
      >
        +
      </button>
    </div>
  );
}