'use client'

import { Button } from "@/components/ui/button";
import { addToCart } from '../apis/cart/AddCart.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';


export default function ProductButton80({ id }: { id: string }) {
  const queryClient = useQueryClient()

const {mutate, data, isPending}= useMutation({
  mutationFn: addToCart,
  onSuccess: (data) => {
    toast.success(data?.message)

    queryClient.invalidateQueries({ queryKey: ['cart'] })
  },
  onError: () => {
    toast.error("Please Login First")
  }

})



  return (
    <div>      <Button onClick={() => {mutate(id)}} className="cursor-pointer w-[80%] mb-5 font-semibold bg-green-600 hover:bg-green-700">
           {isPending? <i className="fas fa-spinner fa-spin"></i>: "Add to cart"} 
          </Button>
          </div>
  )
}
