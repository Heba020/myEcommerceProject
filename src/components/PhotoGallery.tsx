"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

interface ProductGalleryProps {
  imageCover: string;
  images: string[];
  title: string;
}

export default function ProductGallery({
  imageCover,
  images,
  title,
}: ProductGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] =
    useState<SwiperType | null>(null);

  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); 

  const allImages = [
    imageCover,
    ...images.filter((img) => img !== imageCover),
  ];

  return (
    <div className="md-[350px] w-[300px] mx-auto my-5">
      {/* Main Slider */}
      <div className="relative border border-gray-200 rounded-2xl bg-white overflow-hidden shadow-sm">
        {/* Previous Button */}
        <button
          className="
            product-prev
            absolute
            left-2
            top-1/2
            -translate-y-1/2
            z-10
            w-10
            h-10
            rounded-full
            bg-white
            shadow-lg
            hover:bg-green-700
            hover:text-white
            transition-all
            duration-200
            flex
            items-center
            justify-center
            cursor-pointer
          "
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>

        {/* Next Button */}
        <button
          className="
            product-next
            absolute
            right-2
            top-1/2
            -translate-y-1/2
            z-10
            w-10
            h-10
            rounded-full
            bg-white
            shadow-lg
            hover:bg-green-700
            hover:text-white
            transition-all
            duration-200
            flex
            items-center
            justify-center
            cursor-pointer
          "
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>

        <Swiper
          navigation={{
            prevEl: ".product-prev",
            nextEl: ".product-next",
          }}
          thumbs={{
            swiper:
              thumbsSwiper &&
              !thumbsSwiper.destroyed
                ? thumbsSwiper
                : null,
          }}
          modules={[Navigation, Thumbs]}
          className="h-[350px]"
        >
          {allImages.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="flex items-center justify-center h-full p-2 cursor-zoom-in"
               onClick={() => {setCurrentIndex(index); setOpen(true);}}>
                <Image
                  src={img}
                  alt={`${title}-${index}`}
                  width={300}
                  height={300}
                  priority={index === 0}
                  className="h-[350px] w-auto object-contain"
                />
              </div>
              
            </SwiperSlide>
          ))}
        </Swiper>    
      </div>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={currentIndex}
        plugins={[Zoom]}
        slides={allImages.map((img) => ({
          src: img,
        }))}
      />
    </div>
  );
}