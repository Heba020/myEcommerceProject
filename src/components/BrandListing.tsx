"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Brand, ProductType } from "@/src/interfaces/product.interface";
import { GetWishlist } from "@/src/apis/WishList/GetWish.api";

import WishList from "@/src/components/WishList";
import ProductButton80 from "@/src/components/ProductButton90";

interface Props {
  params: {
    _id: string;
    filteredProducts: ProductType[];
    currentBrand: Brand | undefined;
    wishlist: any[]; 
  };
}

export default function BrandListing({ params }: Props) {
  const { filteredProducts, currentBrand, wishlist } = params;

  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const ids =
          wishlist?.map((item: any) => item._id) || [];

        setWishlistIds(ids);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, []);

  return (
    <div className="container py-10">
      <div className="mb-10">

        <h1 className="text-3xl pb-2 font-bold text-neutral-800 border-b-2 border-green-500 pb-1">
          {currentBrand?.name}
        </h1>
      </div>

      <div className="flex flex-wrap">
        {filteredProducts.map((product: ProductType) => (
          <div
            key={product._id}
            className="xl:w-1/5 lg:w-1/4 md:w-1/3 w-1/2 mx-0"
          >
            <div className="p-2 md:p-4 justify-self-center">
              <div className="relative rounded-2xl border border-gray-200 overflow-hidden shadow w-full hover:shadow-2xl hover:shadow-green-200 transition">
                <WishList
                  id={product._id}
                  initialLiked={wishlistIds.includes(product._id)}
                />

                <Link href={`/productDetails/${product._id}`}>
                  <div>
                    <div className="bg-white">
                      <Image
                        width={270}
                        height={200}
                        src={product.imageCover}
                        alt={product.title}
                        className="w-full h-[220px] object-contain justify-self-center"
                      />
                    </div>

                    <div className="m-3">
                      <p className="my-2 font-bold text-green-500 line-clamp-1">
                        {product.title}
                      </p>

                      <p
                        className={
                          product.description?.length <= 50
                            ? "h-[2.5rem] text-sm text-gray-500"
                            : "text-sm text-gray-500 line-clamp-2"
                        }
                      >
                        {product.description}
                      </p>

                      <div className="flex justify-between items-start my-2 h-[40px]">
                        <div className="flex flex-col font-bold">
                          {product.priceAfterDiscount && (
                            <span>
                              {product.priceAfterDiscount} £
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

                        <span className="text-sm text-gray-400 font-bold">
                          {product.ratingsAverage}
                          <i className="fa-solid fa-star text-yellow-500 ms-1"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>

                <div className="text-center">
                  <ProductButton80 id={product._id} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold text-gray-500">
            No Products Found
          </h2>
        </div>
      )}
    </div>
  );
}