import Image from "next/image";
import Link from "next/link";

import { GetWishlist } from "../../apis/WishList/GetWish.api";
import ProductButton80 from "@/src/components/ProductButton80";
import DeleteWishlistButton from "../../components/DeleteWishList";

export const dynamic = "force-dynamic";
export async function generateMetadata() {
  return {
    title: "WishList Page",
  };
}

export default async function WishlistPage() {

const wishlist = await GetWishlist() || [];
  return (

    <div className="container mx-auto py-10 min-h-screen px-3 sm:px-5">

      {/* Title */}
      <div className="text-center mb-12 flex justify-center items-center gap-3">

        <i className="fa-regular fa-heart text-5xl sm:text-7xl text-green-500"></i>

        <h1 className="text-3xl sm:text-5xl font-bold">
          My Wishlist
        </h1>

      </div>

      {/* Wishlist Items */}
      <div className="space-y-8">

        {wishlist.map((product: any) => (

          <div
            key={product._id}
            className="
              border rounded-2xl shadow-md
              p-4 sm:p-5
              flex flex-row
              items-center
              gap-4 sm:gap-6
              hover:shadow-xl
              transition-all duration-300
            "
          >

            {/* Product Image */}
            <div className="w-[140px] sm:w-[180px] shrink-0">

              <Link href={`/productDetails/${product._id}`}>

                <Image
                  src={product.imageCover}
                  alt={product.title}
                  width={200}
                  height={200}
                  className="
                    w-full
                    h-[140px] sm:h-[180px]
                    object-contain
                  "
                />

              </Link>

            </div>

            {/* Product Info */}
            <div className="flex-1 min-w-0">

              <h2 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-3 line-clamp-2">
                {product.title}
              </h2>

              <p className="text-sm sm:text-base text-gray-500 mb-3 sm:mb-4 line-clamp-2">
                {product.description}
              </p>

              {/* Price */}
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5 flex-wrap">

                {product.priceAfterDiscount && (
                  <span className="text-lg sm:text-2xl font-bold text-green-500">
                    {product.priceAfterDiscount} £
                  </span>
                )}

                <span
                  className={`text-sm sm:text-lg ${
                    product.priceAfterDiscount
                      ? "line-through text-gray-400"
                      : "font-bold"
                  }`}
                >
                  {product.price} £
                </span>

              </div>
{/* Bottom Actions */}
<div className="flex flex-row justify-between gap-4">

  {/* Add To Cart */}

    <div className="flex w-auto">
      <ProductButton80 id={product._id} />
    </div>

  {/* Remove */}
  <div className="mb-2">
      <DeleteWishlistButton productId={product._id} />

  </div>
  </div>


</div>

            </div>


        ))}

      </div>

      {/* Empty Wishlist */}
      {wishlist.length === 0 && (

        <div className="text-center py-20">

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">

            <i className="fa-regular fa-face-sad-cry text-7xl sm:text-9xl text-neutral-500"></i>

            <div>

              <h2 className="text-2xl sm:text-3xl font-bold mt-2">
                Your wishlist is empty
              </h2>

              <p className="text-gray-500 mt-3 text-sm sm:text-base">
                Add products you love to wishlist.
              </p>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}