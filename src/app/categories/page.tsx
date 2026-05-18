import { Category }
from "../../interfaces/product.interface";

import { HandleCategories }
from "../../apis/Categories/Categories.api";

import CategoryItem
from "@/src/components/CategoryItem";

export async function generateMetadata() {

  return {
    title: "Categories",
  };
}

export default async function CategoriesPage() {

  const categories: Category[] =
    await HandleCategories() || [];

  return (

    <div className="flex flex-wrap justify-center">

      {Array.isArray(categories) &&
        categories.map((category) => (

          <CategoryItem
            key={category._id}
            category={category}
          />

      ))}

    </div>
  );
}