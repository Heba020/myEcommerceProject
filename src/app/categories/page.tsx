import Link from "next/link";
import Image from "next/image";
import { HandleCategories } from "@/src/apis/Categories/Categories.api";
import { Category } from "@/src/interfaces/product.interface";

export default async function CategoriesPage() {
  const categories = await HandleCategories();

  return (
    <div className="container py-10">

      <h1 className="text-3xl font-bold mb-8">
        Categories
      </h1>

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">

        {categories.map((category:Category) => (

          <Link
            key={category._id}
            href={`/Categories/${category._id}`}
          >
            <div className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition">

              <Image
                src={category.image}
                alt={category.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />

              <h2 className="p-4 font-bold text-center">
                {category.name}
              </h2>

            </div>
          </Link>

        ))}

      </div>

    </div>
  );
}