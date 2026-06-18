export const dynamic = "force-dynamic";

import { handleProducts } from "@/src/apis/products/products.api";
import { HandleBrands } from "@/src/apis/Brands/Brands.api";

import { Brand, ProductType } from "@/src/interfaces/product.interface";
import Loading from "@/src/auth/Loading";
import { Suspense } from "react";
import { GetWishlist } from "@/src/apis/WishList/GetWish.api";
import BrandListing from "@/src/components/BrandListing";

interface Props {
  params: {
    _id: string;
  };
}

export default async function BrandDetails({
  params,
}: Props) {
  const { _id } = await params;
const wishlist = await GetWishlist();

  const products = await handleProducts();

  const brands = await HandleBrands();

  const currentBrand = brands.find(
    (brand:Brand) => brand._id === _id
  );

  const filteredProducts = products.filter(
    (product:ProductType) =>
      product.brand?._id === _id
  );
  return (
        <Suspense fallback={<Loading />}>
    
<BrandListing params={{ _id , filteredProducts , currentBrand, wishlist }} />
      </Suspense>
  );
}