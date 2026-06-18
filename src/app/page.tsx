export const dynamic = "force-dynamic";
import { Suspense } from 'react'
import Loading from '../auth/Loading'
import MainSlider from '../components/MainSlider'
import ProductsList from '@/src/components/ProductsList';
import { Category } from "../interfaces/product.interface";
import { HandleCategories } from "../apis/Categories/Categories.api";


export default async function lPage() {
      const categories: Category[] = await HandleCategories();

  return (
    <div className='mx-10'>
<Suspense fallback={<Loading />}>
<div>
  <MainSlider />
  </div>
  <ProductsList/>
          </Suspense>
    </div>
  )
}
