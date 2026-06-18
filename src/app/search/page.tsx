import { handleProducts } from "@/src/apis/products/products.api";
import { ProductType } from "@/src/interfaces/product.interface";
import SearchResults from "@/src/components/SearchResults";

interface Props {
  searchParams?: Promise<{
    q?: string;
  }>;
}

export default async function SearchPage({
  searchParams,
}: Props) {
  const products = await handleProducts();

  const params = await searchParams;

  const query =
    params?.q?.toLowerCase().trim() || "";

const filteredProducts =
  query === ""
    ? []
    : products
        .map((product: ProductType) => {
          let score = 0;

          const title =
            product.title?.toLowerCase() || "";

          const brand =
            product.brand?.name?.toLowerCase() || "";

          const category =
            product.category?.name?.toLowerCase() || "";

          const description =
            product.description?.toLowerCase() || "";

          // Exact title match
          if (title === query) score += 100;

          // Title starts with query
          if (title.startsWith(query)) score += 80;

          // Title contains query
          if (title.includes(query)) score += 60;

          // Brand match
          if (brand.includes(query)) score += 40;

          // Category match
          if (category.includes(query)) score += 30;

          // Description match
          if (description.includes(query)) score += 10;

          if (
  query === "men" &&
  (
    title.includes("women") ||
    description.includes("women") ||
    category.includes("women")
  )
) {
  score = -1000;
}

if (  query === "man" &&
  (
    title.includes("woman") ||
    description.includes("woman") ||
    category.includes("woman")
  )
) {
  score = -1000;
}

          return {
            product,
            score,
          };
        })
        .filter((item: { score: number }) => item.score > 0)
        .sort((a: { score: number }, b: { score: number }) => b.score - a.score)
        .map((item: { product: ProductType }) => item.product);

  return (
    <div className="mx-10 py-10">
      <div className="w-full mx-auto mb-10">
        <div className="mt-4 text-center">
          <h1 className="text-3xl font-bold text-neutral-800 border-b-2 border-green-500 inline-block pb-1">
            Search Results
          </h1>

          <p className="text-gray-500 mt-2">
            {filteredProducts.length} result
            {filteredProducts.length !== 1 && "s"}
            {query && (
              <>
                {" "}
                for{" "}
                <span className="font-semibold text-green-600">
                  "{query}"
                </span>
              </>
            )}
          </p>
        </div>
      </div>

      {!query ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-gray-500">
            Start typing to search products
          </h2>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-gray-500">
            No Products Found
          </h2>
        </div>
      ) : (
        <SearchResults products={filteredProducts} />
      )}
    </div>
  );
}