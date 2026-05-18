export const dynamic = "force-dynamic";
import { Suspense } from 'react'
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
