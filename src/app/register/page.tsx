'use client'
import { useForm } from 'react-hook-form'
import { Form, FormItem, FormMessage, FormLabel, FormControl, FormDescription, FormField } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, registerSchemaValidation } from '@/src/schema/register.schema'

export default function RegisterPage() {

const form = useForm(
{
  resolver: zodResolver(registerSchema),
  defaultValues: {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phoneNumber: "",
}
}
);


function wSubmit(data:registerSchemaValidation) {
  
};

  return (

    <>
      <Form {...form}>
        <form className='w-1/2 mx-auto' onSubmit={form.handleSubmit(wSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <div>
                  <Input placeholder="username" {...field} />
                  {field.value}
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
                    <br />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email"  placeholder="email" {...field} />
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

          <FormField
            control={form.control}
            name="rePassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Re-enter Password</FormLabel>
                <FormControl>
                  <Input type="password"  placeholder="re-enter password" {...field} autoComplete='false'/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
                    <br />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input type="tel"  placeholder="phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <br />
          <Button type="submit" className='bg-green-400 hover:bg-green-200 hover:text-black ms-auto block text-white'>Register</Button>
        </form>

      </Form>
    </>
  )
}
