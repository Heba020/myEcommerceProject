export const dynamic = "force-dynamic";
import CheckOutform from '../../../components/CheckOutform'

interface pageProps {
  params: {
    cartId: string;
  };
}
export async function generateMetadata() {
  return {
    title: "Check Out",
  };
}

export default async function checkOut({params}: pageProps) {
  const {cartId} = await params
  return (
<div>
    <CheckOutform cartId={cartId} />
</div>
  )
}
