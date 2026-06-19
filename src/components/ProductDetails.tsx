import { handleSingleProducts } from "../apis/products/singleProduct.api";
import { ProductType } from "@/src/interfaces/product.interface";
import ProductButton from "@/src/components/ProductButton";
import WishList from "./WishList";
import { GetWishlist } from "../apis/WishList/GetWish.api";
import ProductGallery from "./PhotoGallery";
import ProductDetailsActions
from "./ProductDetailsActions";


interface pageProps {
  params: {
    id: string;
  };
}

export default async function page({ params }: pageProps) {
  const { id } = await params;

  const data: ProductType = await handleSingleProducts(id);
    const wishlist = await GetWishlist();

const wishlistIds =
  wishlist?.map((item: any) => item._id) || [];


return (
<div className="container px-10 py-2 grid lg:grid-cols-3 md:grid-cols-2 gap-6 items-center">

  <div className=" relative justify-self-center md:col-span-1">
 <ProductGallery  imageCover={data.imageCover} images={data.images} title={data.title} />
<div className="absolute top-5 left-0.5">
    <WishList id={data._id} initialLiked={wishlistIds.includes(data._id)} />
</div>
  </div>

  <div className=" w-full ms-5 justify-self-center p-4 lg:col-span-2 md:col-span-1">
   
        <h1 className="text-2xl font-bold mb-4 text-green-500">{data.title}
    </h1>      

    <p className="text-md text-gray-600">{data.description}</p>

    <div className="flex justify-between items-center mt-4 font-bold">
      <div>
        {data.priceAfterDiscount && (
          <span className="mr-2">{data.priceAfterDiscount} £</span>
        )}

        <span
          className={
            data.priceAfterDiscount
              ? "line-through text-gray-400 text-sm"
              : ""
          }
        >
          {data.price} £
        </span>
      </div>

      <span className="text-sm text-gray-400">
        {data.ratingsAverage}
        <i className="fa-solid fa-star text-yellow-500"></i>
      </span>
    </div>

<div className=" mt-10">
  <ProductDetailsActions
    productId={data._id}
  />
</div>
  </div>

</div>
  );
}
