import React, { Suspense } from 'react'
import { handleProducts } from '../../apis/products/products.api'
import { ProductType } from '../../interfaces/product.interface';
import ProductItem from '../../components/productItem';
import Loading from '../../scheme/Loading';
import FeaturedProducts from '../../components/featuredProducts';
export async function generateMetadata() {
  return {
    title: "Products",
  };
}
export default async function fProducts() {

  return (
<Suspense fallback={<Loading />}>
          <FeaturedProducts />
          </Suspense>
  )
}
