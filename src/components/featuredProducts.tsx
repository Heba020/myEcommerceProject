import { handleProducts }
from "../apis/products/products.api";

import { ProductType }
from "../interfaces/product.interface";

import ProductItem
from "./productItem";

import { GetWishlist }
from "../apis/WishList/GetWish.api";

export default async function FProducts() {

  const products =
    await handleProducts() || [];

  const wishlist =
    await GetWishlist() || [];

  const wishlistIds =
    wishlist.map((item: any) => item._id);

  if (!products.length) {

    return (

      <h1 className="text-center text-3xl font-bold mt-20">
        No products found
      </h1>

    );
  }

  return (

    <div className="flex flex-wrap">

      {Array.isArray(products) &&
        products.map((product: ProductType) => (

          <ProductItem
            key={product._id}
            proplala={product}
            wishlistIds={wishlistIds}
          />

      ))}

    </div>
  );
}