"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";

import { useQuery } from "@tanstack/react-query";

import { ProductType } from "../interfaces/product.interface";
import { CartResponse } from "../interfaces/cart.interface";

import { handleProducts } from "../apis/products/products.api";
import { GetWishlist } from "../apis/WishList/GetWish.api";

import WishList from "./WishList";
import ProductButton80 from "./ProductButton90";
import CartCounter from "./CartCounter";
import Loading from "../auth/Loading";

export default function ProductsList() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // CART
  const { data: cart } = useQuery<CartResponse>({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await fetch("/api/cart");
      return res.json();
    },
  });

  useEffect(() => {
    async function getData() {
      try {
        const response = await handleProducts();

        const productsData =
          response.data || response;

        setProducts(productsData);

        const wishlist =
          await GetWishlist();

        const ids =
          wishlist?.map(
            (item: any) => item._id
          ) || [];

        setWishlistIds(ids);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, []);

  const cartItems =
    cart?.data?.products || [];

  const getCartItem = (
    productId: string
  ) =>
    cartItems.find(
      (item) =>
        item.product._id === productId
    );

  if (loading) {
    return (
<Loading />
    );
  }

  return (
    <div className="py-4">
      <div className="flex flex-wrap">
        {products.map((product) => {
          const cartItem =
            getCartItem(product._id);

          return (
            <div
              key={product._id}
              className="
                xl:w-1/5
                lg:w-1/4
                md:w-1/3
                w-1/2
                mx-0
              "
            >
              <div className="p-2 md:p-4 justify-self-center">
                <div
                  className="
                    relative
                    rounded-2xl
                    border
                    border-gray-200
                    overflow-hidden
                    shadow
                    w-full
                    hover:shadow-2xl
                    hover:shadow-green-300
                    transition
                  "
                >
                  {/* WISHLIST */}
                  <WishList
                    id={product._id}
                    initialLiked={wishlistIds.includes(
                      product._id
                    )}
                  />

                  {/* PRODUCT */}
                  <Link
                    href={`/productDetails/${product._id}`}
                  >
                    <div>
                      {/* IMAGE */}
                      <div className="bg-white">
                        <Image
                          width={270}
                          height={200}
                          src={product.imageCover}
                          alt={product.title}
                          className="
                            w-full
                            h-[220px]
                            object-contain
                            justify-self-center
                          "
                        />
                      </div>

                      {/* CONTENT */}
                      <div className="m-3">
                        <p
                          className="
                            my-2
                            font-bold
                            text-green-500
                            line-clamp-1
                          "
                        >
                          {product.title}
                        </p>

                        <p
                          className={
                            product.description
                              .length <= 50
                              ? "h-[2.5rem] text-sm text-gray-500"
                              : "text-sm text-gray-500 line-clamp-2"
                          }
                        >
                          {product.description}
                        </p>

                        <div
                          className="
                            flex
                            justify-between
                            items-start
                            my-2
                            h-[40px]
                          "
                        >
                          <div
                            className="
                              flex
                              flex-col
                              font-bold
                            "
                          >
                            {product.priceAfterDiscount && (
                              <span className="me-2">
                                {
                                  product.priceAfterDiscount
                                }{" "}
                                £
                              </span>
                            )}

                            <span
                              className={
                                product.priceAfterDiscount
                                  ? "line-through text-gray-400 text-sm"
                                  : ""
                              }
                            >
                              {product.price} £
                            </span>
                          </div>

                          <span
                            className="
                              text-sm
                              text-gray-400
                              font-bold
                            "
                          >
                            {
                              product.ratingsAverage
                            }
                            <i
                              className="
                                fa-solid
                                fa-star
                                text-yellow-500
                                ms-1
                              "
                            ></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* CART ACTION */}
                  <div className="text-center pb-3">
                    {cartItem ? (
                      <CartCounter
                        productId={
                          product._id
                        }
                        count={
                          cartItem.count
                        }
                      />
                    ) : (
                      <ProductButton80
                        id={product._id}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}