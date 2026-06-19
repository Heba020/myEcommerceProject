'use client'

import Slider from "react-slick";
import Link from "next/link";


export default function MainSlider() {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  const slides = [
    {
      image: "/Shopping-2.png",
      title: "Fresh Summer Collection",
      desc: "Discover the latest trends with premium quality.",
    },
    {
      image: "/electronics-2.png",
      title: "Exclusive Deals",
      desc: "Shop now and enjoy amazing discounts today.",
    },
  ];

  return (

    <div
      className="
        main-slider
        mb-5
        overflow-hidden
        rounded-3xl
        border
        border-gray-200
        shadow-sm
        relative
      "
    >

      <Slider {...settings}>

        {slides.map((slide, index) => (

          <div key={index}>

            <div
              className="
                relative
                flex
                items-center
                h-[300px]
                md:h-[450px]
                bg-cover
                bg-center
              "
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundPosition: "58% center",
              }}
            >

              {/* CONTENT */}
              <div
                className="
                  relative
                  z-10
                  max-w-xl
                  pe-60
                  ps-5
                  lg:px-12
                  md:px-5
                  text-green-900
                "
              >

                <h1 className="mb-4 text-3xl md:text-5xl font-bold">
                  {slide.title}
                </h1>

                <p className="text-sm md:text-lg">
                  {slide.desc}
                </p>

                  <Link href="/">
                    <button
                      className="
                        mt-6
                        rounded-xl
                        bg-green-900
                        px-4
                        py-2
                        text-white
                        font-bold
                        hover:bg-green-600
                        transition-all
                        duration-300
                        cursor-pointer
                        shadow-lg
                      "
                    >
                      Shop Now
                    </button>
                  </Link>

              </div>

            </div>

          </div>
        ))}

      </Slider>
    </div>
  );
}