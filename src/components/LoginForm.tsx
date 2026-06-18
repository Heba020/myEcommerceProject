"use client";

import { useState } from 'react'
import { useForm } from 'react-hook-form'


import {
  Form,
  FormItem,
  FormMessage,
  FormLabel,
  FormControl,
  FormField
} from '@/components/ui/form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { zodResolver } from '@hookform/resolvers/zod'

import {
  loginSchema,
  loginSchemaValidation
} from '@/src/schema/login.schema'

import { signIn } from 'next-auth/react'

import Link from "next/link";

import toast from 'react-hot-toast'
import { Berkshire_Swash }
from "next/font/google";

const berkshireSwash =
  Berkshire_Swash({
    subsets: ["latin"],
    weight: "400",
  });

export default function LoginForm() {

  const [LoadingSpinner, setLoadingSpinner] =
    useState(false);

  const form = useForm<loginSchemaValidation>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });

  async function wSubmit(
    data: loginSchemaValidation
  ) {

    setLoadingSpinner(true);

    const response = await signIn(
      'credentials',
      {
        email: data.email,
        password: data.password,
        callbackUrl: "/",
        redirect: false
      }
    );

    if (response?.ok) {

      window.location.href =
        response.url || "/";

      setLoadingSpinner(false);

      toast.success(
        "Logged in successfully!"
      );

    } else {

      setLoadingSpinner(false);

      toast.error(
        response?.error ||
        "Login failed. Please check your Password or/and Email."
      );
    }
  }
  return (
    <>
<div className='mx-auto border border-2 shadow-[0_0_30px_rgba(21,128,61,0.4)] shadow-2xl rounded-2xl py-10 sm:w-[700px] w-[400px]'>
  <h2 className={` text-5xl text-center mt-5 mb-15 font-bold           ${berkshireSwash.className}
`}>
    Welcome Back
  </h2>
       <Form {...form}>

        <form
          className='w-1/2 mx-auto'
          onSubmit={form.handleSubmit(wSubmit)}
        >

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>

                <FormLabel className='font-semibold text-neutral-700'>Email</FormLabel>

                <FormControl>
                  <Input
                    type="email"
                    placeholder="email"
                    {...field}
                      className="
    focus-visible:ring-2
    focus-visible:ring-green-700
    focus-visible:ring-offset-0
    focus-visible:border-green-700
    transition-all
    duration-200
  "
                  />
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

                <FormLabel className='font-semibold text-neutral-700'>Password</FormLabel>

                <FormControl>
                  <Input
                    type="password"
                    placeholder="password"
                    {...field}
                    autoComplete='off'
                      className="
    focus-visible:ring-2
    focus-visible:ring-green-700
    focus-visible:ring-offset-0
    focus-visible:border-green-700
    transition-all
    duration-200
  "
                  />
                </FormControl>

                <FormMessage />

              </FormItem>
            )}
          />

          <br />

          <Button
            type="submit"
            className='bg-green-700 hover:bg-green-200 cursor-pointer  hover:border-green-700 border hover:text-black block text-white'
          >

            {LoadingSpinner ? (
              <i className="fas fa-spinner fa-spin text-white"></i>
            ) : (
              "Login"
            )}

          </Button>
          
          <Link href="/forgot-password">
            <Button
              className="bg-green-700 text-sm text-white cursor-pointer   hover:text-black hover:bg-green-200 hover:border-green-700 border mt-3"
            >


                  Forgot Password ?


            </Button>
          </Link>

        </form>

      </Form> 
</div>


    </>
  );
}