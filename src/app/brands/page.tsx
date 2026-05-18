import { Brand } from "../../interfaces/product.interface";
import BrandItem from "@/src/components/BrandItem";
import { HandleBrands } from "../../apis/Brands/Brands.api";
export async function generateMetadata() {
  return {
    title: "Brands",
  };
}
export default async function BrandsPage() {
  const brands: Brand[] = await HandleBrands();

  return (
    <div className="flex flex-wrap justify-center">
      {brands.map((brand) => (
        <BrandItem key={brand._id} brand={brand} />
      ))}
    </div>
  );
}