'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormItem, FormMessage, FormLabel, FormControl, FormDescription, FormField } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ca, de } from 'zod/locales'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, loginSchemaValidation } from '@/src/schema/login.schema'
import { signIn } from 'next-auth/react'
import { set } from 'zod'
import Loading from '@/src/scheme/Loading'
import toast from 'react-hot-toast'

export default function LoginPage() {
 
 
  const [LoadingSpinner, setLoadingSpinner] = useState(false);

  const form = useForm<loginSchemaValidation>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });

  async function wSubmit(data: loginSchemaValidation) {
    setLoadingSpinner(true);
    const response = await signIn('credentials', {
      email: data.email,
      password: data.password,
      callbackUrl: "/",
      redirect: false
    });
    
    
    if (response?.ok) {
      window.location.href = response.url || "/";
      setLoadingSpinner(false);
      toast.success("Logged in successfully!");
    } else {
      setLoadingSpinner(false);
      toast.error(response?.error || "Login failed. Please check your Password or/and Email.");
    }
  } 

  return (
    <>
      <Form {...form}>
        <form className='w-1/2 mx-auto' onSubmit={form.handleSubmit(wSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <br />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="password" {...field} autoComplete='off' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <br />
          <Button type="submit" className='bg-green-400 hover:bg-green-200 hover:text-black ms-auto block text-white'>
            {LoadingSpinner ? <i className="fas fa-spinner fa-spin text-white"></i> : "Login"}
          </Button>
        </form>
      </Form>
    </>
  )
}