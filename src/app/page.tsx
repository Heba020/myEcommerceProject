import FeaturedProducts from '../components/featuredProducts'
import { Suspense } from 'react'
import Loading from '../scheme/Loading'
import MainSlider from '../components/MainSlider'

export default function lPage() {
  return (
    <div className='mx-10'>
<Suspense fallback={<Loading />}>
<div>
  <MainSlider />
  </div>

          <FeaturedProducts />
          </Suspense>
    </div>
  )
}
