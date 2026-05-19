import { handleProducts } from '../apis/products/products.api'
import { ProductType } from '../interfaces/product.interface';
import ProductItem from './productItem';

export default async function FProducts() {

  const products = await handleProducts();

  return (
    <div className='flex flex-wrap'>
      {Array.isArray(products) &&
        products.map((product: ProductType) => (
          <ProductItem
            proplala={product}
            key={product._id}
          />
        ))}
    </div>
  );
}
