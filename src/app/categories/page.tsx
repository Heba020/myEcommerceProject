export const dynamic = "force-dynamic";

import { Category } from "../../interfaces/product.interface";
import { HandleCategories } from "../../apis/Categories/Categories.api";
import CategoryItem from "@/src/components/CategoryItem";
export async function generateMetadata() {
  return {
    title: "Categories",
  };
}
export default async function CategoriesPage() {
  const category: Category[] = await HandleCategories();

  return (
    <div className="flex flex-wrap justify-center">
      {category.map((category) => (
        <CategoryItem key={category._id} category={category} />
      ))}
    </div>
  );
}