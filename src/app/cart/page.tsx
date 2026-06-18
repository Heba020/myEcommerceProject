export const dynamic = "force-dynamic";

import { Suspense } from "react";
import CartComponent
from "../../components/CartComponent";
import Loading from "@/src/auth/Loading";


export const metadata = {
  title: "Cart",
};

export default function CartPage() {

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <CartComponent />
      </Suspense>
    </div>
  )
}