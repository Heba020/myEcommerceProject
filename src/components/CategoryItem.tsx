
import { Category } from "../interfaces/product.interface";
import Link from "next/link";
import Image from "next/image";

export default function CategoryItem({
  category,
}: {
  category: Category;
}) {
  return (
    <div className="xl:w-1/5 lg:w-1/4 md:w-1/3 sm:w-1/2 sm:mx-0 mx-auto">
      <div className="p-5 justify-self-center">
        <div className="relative rounded-2xl border border-gray-200 overflow-hidden shadow sm:w-full w-[300px] hover:shadow-lg transition duration-300">

          <Link href={`/categories/${category._id}`}>

            <div className="bg-white p-6">
              <Image
                width={200}
                height={200}
                src={category.image}
                alt={category.name}
                className="sm:w-full w-[250px] h-[220px] object-contain justify-self-center"
              />
            </div>

            <div className="m-4 text-center">
              <h2 className="font-bold text-green-600 text-lg line-clamp-1">
                {category.name}
              </h2>

              <p className="text-sm text-gray-500">
                {category.slug}
              </p>
            </div>

          </Link>
        </div>
      </div>
    </div>
  );
}
