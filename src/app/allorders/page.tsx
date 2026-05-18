export const dynamic = "force-dynamic";

import AllOrdersComponent
from "@/src/components/AllOrders";

export const metadata = {
  title: "All Orders",
};

export default function AllOrdersPage() {

  return <AllOrdersComponent />;
}