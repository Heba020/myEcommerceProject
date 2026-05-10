"use client";
import { Session } from "inspector/promises";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import  { useState } from "react";
import { signOut } from "next-auth/react"
import { CartResponse } from "../interfaces/cart.interface";
import { useQuery } from "@tanstack/react-query";

export default function Navbar() {


// get cart data
  const { data} = useQuery<CartResponse>({

queryKey: ["cart"],
queryFn: async () => {

  const res = await fetch("/api/cart");
  const data = await res.json();

  return data;
    },
  })

  // fix total items count by calculating it from products count instead of using numOfCartItems as it doesn't count the total items but counts the number of different products in cart which is wrong as it should count the total items in cart jus the number of different items in the cart
const products = data?.data?.products ?? [];

const totalItems = products.reduce(
  (total, product) => total + product.count,
  0
);



  const { data: Session, status } = useSession();

  const [Toggle, setToggle] = useState(true);

  function toggleMenu() {
    setToggle(!Toggle);
  }
    function logout() {
      signOut({callbackUrl:'/'});
    }

  const links = [
    { path: "/products", content: "products" },
    { path: "/brands", content: "brands" },
    { path: "/categories", content: "categories" },
    ...(status === "authenticated"
    ? [{ path: "/allorders", content: "Orders" }]
    : [])

    
  ];
  const auth = [
    { path: "/login", content: "login" },
    { path: "/register", content: "register" },

  ];

  return (
    <nav className="bg-neutral-primary w-full z-20 top-0 start-0 border-b border-default mb-5">
      <div className="max-w-screen-xl flex flex-wrap lg:flex-nowrap lg:gap-10 gap-1 mx-auto items-center justify-between py-4">
        <Link href="/" className="flex items-center">
          <Image
            width={150}
            height={100}
            quality={75}
            src="/e-images/freshcart-logo.svg"
            alt="freshcart logo"
          />
        </Link>
        <button
          onClick={toggleMenu}
          data-collapse-toggle="navbar-default"
          type="button"
          className="cursor-pointer inline-flex m-2 items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base lg:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth={2}
              d="M5 7h14M5 12h14M5 17h14"
            />
          </svg>
        </button>
        
        

        <div
          className={`${Toggle && "hidden"} w-full lg:flex  block justify-between`}
          id="navbar-default"
        >

          <ul className="text-center font-medium flex flex-col p-4 lg:p-0 mt-4 border border-default rounded-base  lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0 lg:bg-neutral-primary">
                                            <li className="lg:hidden block px-3 py-4 lg:py-0 bg-green-100">
    Hi<span className="uppercase text-green-700"> {Session?.user?.name}
    </span>
    <i className="mx-2 fa-regular fa-face-smile-beam"></i>
  </li>
            {links.map((ele) => (
              <li key={ele.content}>
                <Link
                  href={ele.path}
                  className="block py-2 px-3 text-white bg-brand rounded lg:bg-transparent lg:text-fg-brand lg:p-0 "
                  aria-current="page"
                >
                  {ele.content.toUpperCase()}
                </Link>
              </li>
            ))}
          </ul>

<div className="ml-auto">
            <ul className="text-center font-medium flex flex-col p-4 lg:p-0 mt-4 gap-2 border border-default rounded-base  lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0 lg:bg-neutral-primary">
            {status === "authenticated"? 
                <>
                                            <li className="hidden lg:block px-3 py-4 lg:py-0 bg-green-100 text-center">
    Hi<span className="uppercase text-green-700"> {Session?.user?.name}
    </span>
    <i className="mx-2 fa-regular fa-face-smile-beam"></i>
  </li>
<li>
  <Link href="/cart" className="relative inline-block">
    <i className="px-3 fa-solid fa-shopping-cart text-xl"></i>

    {totalItems > 0 && (
<span className="absolute -top-3 -right-6.5 flex items-center justify-center min-w-[20px] leading-none pt-[1px] pe-[5px] h-5 px-1 text-[10px] font-bold text-white bg-green-500 rounded-full shadow-md">
          {totalItems}
      </span>
    )}
  </Link>
</li>
            <li className="px-3 uppercase cursor-pointer" onClick={logout}>Log out</li>

                </>
                :
                <>
                 {auth.map((ele) => (
                <li key={ele.content}>
                  <Link
                    href={ele.path}
                    className="block py-2 px-3 text-white bg-brand rounded lg:bg-transparent lg:text-fg-brand lg:p-0 "
                    aria-current="page"
                  >
                    {ele.content.toUpperCase()}
                  </Link>
                </li>
              ))}
              </>
            }
          </ul>
          
</div>

        </div>

      </div>                

    </nav>
  );
}
