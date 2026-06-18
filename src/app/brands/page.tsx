import Link from "next/link";
import { HandleBrands } from "@/src/apis/Brands/Brands.api";
import { Brand } from "@/src/interfaces/cart.interface";

export default async function BrandsPage() {
  const brands = await HandleBrands();

  return (
    <div className="container py-4">
      <h1 className="text-3xl font-bold mb-8">
        Brands
      </h1>

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">

        {brands.map((brand:Brand) => (

          <Link
            key={brand._id}
            href={`/brands/${brand._id}`}
          >
            <div className="border rounded-xl p-6 hover:shadow-lg transition">

              <img
                src={brand.image}
                alt={brand.name}
                className="w-full h-32 object-contain"
              />

              <h2 className="font-bold text-center mt-4">
                {brand.name}
              </h2>

            </div>
          </Link>

        ))}

      </div>
    </div>
  );
}