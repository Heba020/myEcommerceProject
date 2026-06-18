import { Suspense, use } from "react";
import Loading from "@/src/auth/Loading";
import ProductDetails from "../../../components/ProductDetails";
import { handleSingleProducts } from "../../../apis/products/singleProduct.api";

interface pageProps {
  params: Promise<{
    id: string;
  }>;
}
export async function generateMetadata() {
  return {
    title: "Product's Details",
  };
}
export default function DetailsPage({ params }: pageProps) {
  const { id } = use(params);
  
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <ProductData id={id} />
      </Suspense>
    </div>
  );
}

async function ProductData({ id }: { id: string }) {
  const data = await handleSingleProducts(id);
  return <ProductDetails params={data} />;
}