'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormItem, FormMessage, FormLabel, FormControl, FormDescription, FormField } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import OnlinePay, { ShippingAddress } from '../apis/Payment/online-pay.api'


export default function CheckOutform({cartId}: {cartId: string}) {
      const [LoadingSpinner, setLoadingSpinner] = useState(false);
    
      const form = useForm({
        defaultValues: {
          city: "",
          phone: "",
          details: ""
        }
      });
    
      async function wSubmit(data:ShippingAddress) {
        setLoadingSpinner(true);
        const response = await OnlinePay(cartId, data);
        if (response.status === 'success')
        {
                  setLoadingSpinner(false);
window.location.href = response.session.url
        }
        else{
          setLoadingSpinner(false);
        }
      }

  return (
    <>
      <Form {...form}>
        <form className='w-1/2 mx-auto' onSubmit={form.handleSubmit(wSubmit)}>
          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Details</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="details" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <br />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="phone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <br />
                    <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="City" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
            <br />
          <Button type="submit" className='bg-green-400 hover:bg-green-200 hover:text-black ms-auto block text-white'>
            {LoadingSpinner ? <i className="fas fa-spinner fa-spin text-white"></i> : "Check Out"}
          </Button>
        </form>
      </Form>
    </>
  )
}
