import { ProductType } from "../interfaces/product.interface";
import Link  from "next/link";
import ProductButton80 from "@/src/components/ProductButton80";
import Image from "next/image";
import WishList from "./WishList";


export default function ProductItem({ proplala }: { proplala: ProductType }) {

  return (
    <div className="xl:w-1/5 lg:w-1/4 md:w-1/3 sm:w-1/2 sm:mx-0 mx-auto"> 

<div className="p-5 col justify-self-center">

          <div className=" relative rounded-2xl border-gray-200 border overflow-hidden shadow sm:w-full w-[3o0px] ">
        <WishList/>

   <Link href={`/productDetails/${proplala._id}`}>
           <div>
         <div>
                  <Image
                  width={200}
                  height={200}
                  src={proplala.imageCover}
                  alt={proplala.title}
                  className=" sm:w-full w-[250px] justify-self-center object-contain"
                />
        </div>
        <div className="m-4">
                  <p className="my-2 font-bold text-green-500 line-clamp-1">
          {proplala.title}

        </p>

        <p className={proplala.description.length <= 50 ? "h-[2.5rem] text-sm text-gray-500" : "text-sm text-gray-500 line-clamp-2"} >
          {proplala.description}
        </p>
        <div className="flex justify-between items-center mt-2  font-bold">
          <div className="my-4">
            {proplala.priceAfterDiscount && (
              <span className="me-2">{proplala.priceAfterDiscount} £</span>
            )}
            <span
              className={
                proplala.priceAfterDiscount ? "line-through text-gray-400 text-sm" : ""
              }
            >
              {proplala.price} £
            </span>
          </div>

          <span className=" text-sm text-gray-400" >{proplala.ratingsAverage} <i className="fa-solid fa-star text-yellow-500"></i></span>
        </div>
   </div>

        </div >
   </Link>

<div className=" text-center">
  
    <ProductButton80 id={proplala._id} />

</div>
      </div>

</div>
    </div>

  );
}
