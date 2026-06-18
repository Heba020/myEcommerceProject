import Image from "next/image";
import Link from "next/link";

import { handleProducts } from "@/src/apis/products/products.api";
import { HandleCategories } from "@/src/apis/Categories/Categories.api";
import { Category, ProductType } from "@/src/interfaces/product.interface";
import Loading from "@/src/auth/Loading";
import { Suspense } from "react";
import CategoryListing from "@/src/components/CategoriesListing";
import { GetWishlist } from "@/src/apis/WishList/GetWish.api";



interface Props {
  params: {
    id: string;
  };
}

export default async function CategoryDetails({
  params,
}: Props) {

  const { id } = await params;

  const products = await handleProducts();

  const categories = await HandleCategories();
const wishlist = await GetWishlist();

  const currentCategory = categories.find(
    (category:Category) => category._id === id
  );

  const filteredProducts = products.filter(
    (product:ProductType) => product.category._id === id
  );

  return (
    <Suspense fallback={<Loading />}>
      <CategoryListing params={{ _id: id, filteredProducts, currentCategory,wishlist }} />
    </Suspense>
  );
}