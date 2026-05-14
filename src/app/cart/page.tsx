"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { CartResponse } from "../../interfaces/cart.interface";
import { Button } from "@/components/ui/button";
import { DeleteItem } from "@/src/apis/cart/Delete-item.api";
import { de } from "zod/locales";
import Loading from "../../components/Loading";
import { useQueryClient } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
import { updateCart } from "@/src/apis/cart/update-cart.api";
import { ClearCart } from "@/src/apis/cart/Clear-cart.api";
import { Span } from "next/dist/trace";
import Link from "next/link";

export default function Cart() {
  const queryClient = useQueryClient();
  // loading ID to know which item is being deleted and show spinner on it
  const [loadingId, setLoadingId] = useState<null | string>(null);

  // get cart data
  const { data, isError, isLoading, error } = useQuery<CartResponse>({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await fetch("/api/cart");
      const data = await res.json();

      return data;
    },
  });

  // handle delete item
  function handleDelete(productId: string) {
    setLoadingId(productId);
    delMutate(productId);
  }

  // DELETE mutation to delete item from cart
  const {
    mutate: delMutate,
    data: deletedData,
    isPending: delPending,
  } = useMutation({
    mutationFn: DeleteItem,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  // update cart mutation
  const {
    mutate: UpdateMutate,
    data: updatedData,
    isPending: updatePending,
  } = useMutation({
    mutationFn: updateCart,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  //  Clear CART mutation to delete item from cart
  const {
    mutate: clearMutate,
    data: clearedData,
    isPending: clearPending,
  } = useMutation({
    mutationFn: ClearCart,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  // handle update item
  function handleUpdate(productId: string, count: number) {
    UpdateMutate({ productId, count });
  }
  // fix total items count by calculating it from products count instead of using numOfCartItems as it doesn't count the total items but counts the number of different products in cart which is wrong as it should count the total items in cart jus the number of different items in the cart
  const totalItems = data?.data.products.reduce(
    (total, product) => total + product.count,
    0,
  );

  if (isLoading) return <Loading />;
  if (isError) return <h2>{error.message}</h2>;

return (
  <div className="max-w-screen-2xl mx-auto px-3 sm:px-5 lg:px-8 py-5">

    {data?.numOfCartItems === 0 ? (

      <div className="flex flex-col items-center justify-center text-center py-20 rounded-3xl border border-gray-200 bg-white shadow-sm">

        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Your cart is empty
        </h2>

        <div className="flex items-center gap-4 mt-6">
          <i className="fa-solid fa-cart-shopping text-6xl text-green-600"></i>
          <i className="fa-regular fa-face-sad-cry text-6xl text-green-600"></i>
        </div>

      </div>

    ) : (

      <div className="flex flex-col xl:flex-row gap-6">

        {/* LEFT SIDE */}
        <div className="flex-1">

          {/* HEADER */}
          <div className="flex flex-row items-center justify-between gap-4 mb-6">

            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Shopping Cart
            </h1>

            <Button
              className="
                bg-red-500
                hover:bg-red-600
                text-white
                rounded-xl
                text-sm
                w-fit
              "
              onClick={() => clearMutate()}
            >
              {clearPending ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                "Clear Cart"
              )}
            </Button>

          </div>

          {/* PRODUCTS */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">

            {data?.data.products.map((product, index) => (

              <div
                key={product._id}
                className={`
                  p-4 sm:p-5
                  ${index !== data.data.products.length - 1
                    ? "border-b border-gray-200"
                    : ""
                  }
                `}
              >

                <div className="flex gap-4">

                  {/* IMAGE */}
                  <div
                    className="

                      w-[160px]
                      h-[160px]

                      bg-gray-100
                      rounded-xl
                      overflow-hidden
                    "
                  >
                    <img
                      src={product.product.imageCover}
                      alt={product.product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="flex-1 min-w-0">

                    {/* TOP */}
                    <div className="flex items-start justify-between gap-3">

                      <div className="min-w-0">

                        <h2
                          className="
                            text-base
                            sm:text-lg
                            font-semibold
                            text-gray-900
                            leading-tight
                            truncate
                          "
                        >
                          {product.product.title}
                        </h2>

                        <div
                          className="
                            flex items-center
                            gap-2
                            mt-1
                            text-xs sm:text-sm
                            text-gray-500
                          "
                        >

                          <span className="truncate">
                            {product.product.category?.name || "Category"}
                          </span>

                          <span className="w-[1px] h-3 bg-gray-300"></span>

                          <span>
                            Qty: {product.count}
                          </span>

                        </div>

                        <p
                          className="
                            mt-2
                            text-base sm:text-lg
                            font-bold
                            text-gray-900
                          "
                        >
                          {product.price} EGP
                        </p>

                      </div>

                      {/* DELETE */}
                      <button
                        onClick={() => handleDelete(product.product._id)}
                        className="
                          text-gray-400
                          hover:text-red-500
                          transition
                          text-lg
                          shrink-0
                        "
                      >
                        <i
                          className={
                            delPending &&
                            product.product._id == loadingId
                              ? "fa-solid fa-spinner fa-spin"
                              : "fa-solid fa-xmark"
                          }
                        ></i>
                      </button>

                    </div>

                    {/* BOTTOM */}
                    <div className="mt-4 flex flex-col gap-3">

                      {/* QUANTITY */}
                      <div
                        className="
                          flex items-center
                          border border-gray-300
                          rounded-xl
                          overflow-hidden
                          w-fit
                        "
                      >

                        {/* MINUS */}
                        <button
                          onClick={() => {
                            handleUpdate(
                              product.product._id,
                              product.count - 1
                            );
                          }}
                          className="
                            px-3 py-1.5
                            hover:bg-gray-100
                            transition
                            text-sm
                          "
                        >
                          -
                        </button>

                        {/* COUNT */}
                        <span className="px-4 text-sm font-medium">
                          {product.count}
                        </span>

                        {/* PLUS */}
                        <button
                          onClick={() => {
                            handleUpdate(
                              product.product._id,
                              product.count + 1
                            );
                          }}
                          className="
                            px-3 py-1.5
                            hover:bg-gray-100
                            transition
                            text-sm
                          "
                        >
                          +
                        </button>

                      </div>

                      {/* STOCK */}
                      <div
                        className="
                          flex items-center
                          gap-2
                          text-green-600
                          text-sm
                          font-medium
                        "
                      >

                        <i className="fa-solid fa-check text-xs"></i>

                        <span>In stock</span>

                      </div>

                    </div>

                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="xl:mt-16 xl:w-[320px] h-fit">

          <div
            className="
              bg-white
              border
              border-gray-200
              rounded-3xl
              shadow-sm
              p-5 sm:p-6
            "
          >

            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Order Summary
            </h2>

            <div className="space-y-4">

              {/* ITEMS */}
              <div className="flex justify-between text-sm">

                <span className="text-gray-500">
                  Items
                </span>

                <span className="font-semibold">
                  {totalItems}
                </span>

              </div>

              {/* SUBTOTAL */}
              <div className="flex justify-between text-sm">

                <span className="text-gray-500">
                  Subtotal
                </span>

                <span className="font-semibold">
                  {data?.data.totalCartPrice} EGP
                </span>

              </div>

              {/* TOTAL */}
              <div
                className="
                  border-t
                  border-gray-200
                  pt-4
                  flex
                  justify-between
                  text-lg
                  font-bold
                "
              >

                <span>Total</span>

                <span className="text-green-600">
                  {data?.data.totalCartPrice} EGP
                </span>

              </div>

            </div>

            {/* CHECKOUT */}
            <Link href={`/checkOut/${data?.cartId}`}>

              <Button
                className="
                  mt-6
                  w-full
                  h-11
                  rounded-xl
                  text-sm
                  bg-green-600
                  hover:bg-green-700
                  text-white
                "
              >
                Proceed to Checkout
              </Button>

            </Link>

          </div>
        </div>

      </div>
    )}
  </div>
);
}
