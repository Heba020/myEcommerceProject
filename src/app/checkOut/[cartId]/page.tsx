import React from 'react'
import CheckOutform from '../../../components/CheckOutform'

interface pageProps {
  params: {
    cartId: string;
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
