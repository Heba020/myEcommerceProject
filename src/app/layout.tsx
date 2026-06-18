import type { Metadata } from "next";
import { Encode_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Footer from "../components/Footer";
import { Toaster } from 'react-hot-toast';
import { NextAuthProvider } from "../Providers/NextAuthProviders";
import Providers from "../Providers/reactQuery.provider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Inter } from "next/font/google";
import { Roboto } from "next/font/google";
import Box from "@mui/material/Box";
import SideSlider from "../components/SideSlider"
import { Berkshire_Swash } from "next/font/google";

import { HandleCategories } from "@/src/apis/Categories/Categories.api";
import { HandleBrands } from "@/src/apis/Brands/Brands.api";


export const metadata : Metadata = {
  title: {
    default: "Fresh Cart",
    template: "%s | Fresh Cart",
  },
    description: "Ecommerce App written in Next.js 13 with TypeScript,Tanstack Query, Tailwind CSS, Flowbite, shadcn, postman, NextAuth, react-hot-toast and Zod"
 ,icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

const berkshireSwash = Berkshire_Swash({
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  subsets: ["latin"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const encode =  Encode_Sans({
  weight:"400",
  subsets: ["latin"],
});






export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await HandleCategories();
  const brands = await HandleBrands();

  return (
    <html lang="en">
      <body className={`${encode.className} antialiased ${inter.className}`}>
        <Providers>
        <Toaster/>
        <NextAuthProvider>
          <div className="flex flex-col min-h-screen">



              <Navbar/>
            <div className="max-w-[1350px]  mx-auto w-full pt-5 pb-20">

            <SideSlider categories={categories} brands={brands}/>
              {children}
                            
            </div>
            

              <Footer />


        </div>
        </NextAuthProvider>    
        </Providers> 

      </body>
    </html>

);
}