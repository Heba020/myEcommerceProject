"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Drawer from "@mui/material/Drawer";
import { Button } from "@/components/ui/button";
import {Brand} from "../interfaces/cart.interface"
import {Category} from "../interfaces/product.interface"

interface SideSliderProps {
  categories: Category[];
  brands: Brand[];
}

export default function SideSlider({
  categories,
  brands,
}: SideSliderProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [showCategories, setShowCategories] =
    useState(true);

  const [showBrands, setShowBrands] =
    useState(false);

  return (
    <div className="sticky top-18 z-50">

      {/* Filter Button */}
      <Button
        className="start-2 xl:start-0 cursor-pointer relative rounded-2xl p-2 bg-green-700 border-2  border-green-500  hover:bg-green-100 hover:border-green-400 hover:text-green-700"
        onClick={() => setOpen(true)}
      >
        <i className="fa-solid fa-filter"></i>
      </Button>

      {/* Drawer */}
      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
      >
        <div className="w-72 h-full p-5">
            <div>
                        <h2 className="text-2xl font-bold text-green-700 mb-6">
                        Filter by
                      </h2>
                            <Button
                    className="cursor-pointer rounded-xl p-2 bg-white border shadow border-gray-200 hover:bg-green-200 absolute top-4 right-4"
                    onClick={() => setOpen(false)}
                  >
                    <i className="fa-solid fa-xmark text-green-700"></i>
                  </Button>
            </div>


          {/* Categories */}
          <div className="border-b pb-4">

            <button
              onClick={() =>
                setShowCategories(!showCategories)
              }
              className=" flex items-center justify-between w-full text-lg font-semibold cursor-pointer"
            >
              <span>Categories</span>

              <i
                className={`fa-solid ${
                  showCategories
                    ? "fa-minus"
                    : "fa-plus"
                }`}
              ></i>
            </button>

            {showCategories && (
              <ul className="mt-3 space-y-1">

                {categories.map((category) => (

                  <li key={category._id}>

                    <button
                      onClick={() => {
                        router.push(
                          `/Categories/${category._id}`
                        );

                        setOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-gray-600 hover:bg-green-100 hover:text-green-600 transition cursor-pointer"
                    >
                      {category.name}
                    </button>

                  </li>

                ))}

              </ul>
            )}

          </div>

          {/* Brands */}
          <div className="pt-4">

            <button
              onClick={() =>
                setShowBrands(!showBrands)
              }
              className="flex items-center justify-between w-full text-lg font-semibold cursor-pointer"
            >
              <span>Brands</span>

              <i
                className={`fa-solid ${
                  showBrands
                    ? "fa-minus"
                    : "fa-plus"
                }`}
              ></i>
            </button>

            {showBrands && (
              <ul className="mt-3 space-y-1">

                {brands.map((brand) => (

                  <li key={brand._id}>

                    <button
                      onClick={() => {
                        router.push(
                          `/brands/${brand._id}`
                        );

                        setOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-gray-600 hover:bg-green-100 hover:text-green-600 transition cursor-pointer"
                    >
                      {brand.name}
                    </button>

                  </li>

                ))}

              </ul>
            )}

          </div>

        </div>
      </Drawer>
    </div>
  );
}