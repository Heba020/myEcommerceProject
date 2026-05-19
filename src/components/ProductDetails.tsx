import { handleSingleProducts } from "../apis/products/singleProduct.api";
import { ProductType } from "@/src/interfaces/product.interface";
import ProductButton from "@/src/components/ProductButton";
import ProductGallery from "../components/PhotoGallery";

interface pageProps {
  params: {
    id: string;
  };
}

export default async function page({ params }: pageProps) {
  const { id } = await params;

  const data: ProductType = await handleSingleProducts(id);

  return (
    <div className="container grid lg:grid-cols-3 md:grid-cols-2 gap-6 items-center">

      {/* Product Gallery */}
      <ProductGallery
        cover={data.imageCover}
        images={data.images}
        title={data.title}
      />

      {/* Product Details */}
      <div className="w-full ms-5 justify-self-center p-4 lg:col-span-2 md:col-span-1">
        <h1 className="text-2xl font-bold mb-4 text-green-500">
          {data.title}
        </h1>

        <p className="text-md text-gray-600">
          {data.description}
        </p>

        <div className="flex justify-between items-center mt-4 font-bold">
          <div>
            {data.priceAfterDiscount && (
              <span className="mr-2">
                {data.priceAfterDiscount} £
              </span>
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

        <div className="text-center mt-10">
          <ProductButton id={data._id} />
        </div>
      </div>
    </div>
  );
}