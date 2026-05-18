export const dynamic = "force-dynamic";

import { Category } from "../../../interfaces/product.interface"
import { HandleSpecificCategory } from "../../../apis/Categories/CategoryDetails.api";
import Image from "next/image";


interface pageProps {
  params: {
    _id: string;
  };
}

export default async function DetailPage({ params }: pageProps) {
  const {_id } = await params;

  const data: Category = await HandleSpecificCategory(_id);

  return (
<div className="container grid lg:grid-cols-3 md:grid-cols-2 gap-6 items-center">

  <div className=" w-fit justify-self-center lg:col-span-1 md:col-span-1">
<Image
alt={data.slug}
                      width={300}
                      height={300}
      src={data.image}
      className="mx-auto"/>

  </div>

  <div className=" w-full ms-5 justify-self-center p-4 lg:col-span-2 md:col-span-1">
    <h1 className="text-2xl font-bold mb-4 text-green-500">{data.name}</h1>

    <p className="text-md text-gray-600">{data.slug}</p>

  </div>

</div>
  );
}
