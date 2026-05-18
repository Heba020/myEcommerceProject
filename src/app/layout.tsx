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

const inter = Inter({
  subsets: ["latin"],
});


export const metadata : Metadata = {
  title: "Fresh Cart",
  description: "Ecommerce App written in Next.js 13 with TypeScript,Tanstack Query, Tailwind CSS, Flowbite, shadcn, postman, NextAuth, react-hot-toast and Zod",
};


const encode =  Encode_Sans({
  weight:"400",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) 

{
  return (
    <html lang="en">
      <body className={`${encode.className} antialiased ${inter.className}`}>
        <Providers>
        <Toaster/>
        <NextAuthProvider>
          <div className="flex flex-col min-h-screen">
              <Navbar/>
            <div className="container max-w-350 pb-20 pt-10">
            
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
