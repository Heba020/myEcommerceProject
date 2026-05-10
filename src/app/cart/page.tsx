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
    <div className=" md:flex flex-nowrap gap-4 ">
      {data?.numOfCartItems === 0 ? (
        <div className="font-bold w-9/10 gap-4  justify-items-center text-center mx-auto bg-neutral-primary-soft shadow-xs rounded-base  ">
          <h2 className="fa-2x">Oh Nooo !!!</h2>
          <h2 className="fa-3x">Your cart is empty</h2>
          <i className="mt-7 fa-solid fa-cart-shopping fa-10x text-green-700"></i>
          <i className="fa-regular fa-face-sad-cry fa-10x text-green-700"></i>
        </div>
      ) : (
        <>
          <div className="w-9/10 overflow-x-auto mx-auto ">
            <table className="bg-neutral-primary-soft shadow-xs rounded-base border border-default text-center w-full text-sm text-body">
              <thead className="text-sm text-body bg-neutral-secondary-medium border-b border-default-medium">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.data.products.map((product) => (
                  <tr
                    key={product._id}
                    className="bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium"
                  >
                    <td className="p-4">
                      <img
                        src={product.product.imageCover}
                        className="w-16 md:w-24 max-w-full max-h-full"
                        alt="Apple Watch"
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-heading">
                      {product.product.title}
                    </td>
                    <td className="px-6 py-4">
                      <form className="max-w-xs mx-auto">
                        <label htmlFor="counter-input-1" className="sr-only">
                          Choose quantity:
                        </label>
                        <div className="relative flex items-center justify-center">
                          <button
                            onClick={() => {
                              handleUpdate(
                                product.product._id,
                                product.count - 1,
                              );
                            }}
                            type="button"
                            id="decrement-button-1"
                            data-input-counter-decrement="counter-input-1"
                            className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6"
                          >
                            <svg
                              className="w-3 h-3 text-heading"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width={24}
                              height={24}
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 12h14"
                              />
                            </svg>
                          </button>
                          <input
                            type="text"
                            id="counter-input-1"
                            data-input-counter
                            className="shrink-0 text-heading border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"
                            value={product.count}
                            readOnly
                          />
                          <button
                            onClick={() => {
                              handleUpdate(
                                product.product._id,
                                product.count + 1,
                              );
                            }}
                            type="button"
                            id="increment-button-1"
                            data-input-counter-increment="counter-input-1"
                            className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6"
                          >
                            <svg
                              className="w-3 h-3 text-heading"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width={24}
                              height={24}
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 12h14m-7 7V5"
                              />
                            </svg>
                          </button>
                        </div>
                      </form>
                    </td>
                    <td className="px-6 py-4 font-semibold text-heading">
                      {product.price}
                    </td>
                    <td className="px-6 py-4">
                      <i
                        onClick={() => handleDelete(product.product._id)}
                        className={`font-medium text-red-500 cursor-pointer fa-solid hover:underline ${
                          delPending && product.product._id == loadingId
                            ? "fa-spin fa-spinner"
                            : "fa-solid fa-trash"
                        }`}
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Button className="text-white my-6" onClick={() => clearMutate()}>
              {clearPending ? (
                <span>
                  <i className="fa-solid fa-spinner fa-spin"></i>
                </span>
              ) : (
                "clear cart"
              )}
            </Button>
          </div>
          
      <div className="w-9/10 md:w-fit md:h-fit justify-items-center text-center md:pt-15 p-10 m-10 md:m-0 mx-auto p-3 bg-neutral-primary-soft shadow-xs rounded-base border border-default text-sm text-body">
        <h2>Number of Cart items {totalItems}</h2>
        <p className="my-3">Total Cart Price {data?.data.totalCartPrice} EGP</p>

       <Link href={`/checkOut/${data?.cartId}`}>
          <Button className="my-3">Check out</Button>
        </Link>
      </div>
        </>
      )}
    </div>
  );
}
