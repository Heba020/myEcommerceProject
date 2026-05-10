'use client'
import Slider from "react-slick";

export default function MainSlider() {
  const settings = {
    dots: false,
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
      image: "/slide-1.jpg",
      title: "Fresh Summer Collection",
      desc: "Discover the latest trends with premium quality.",
    },
    {
      image: "/slider-2.jpg",
      title: "Exclusive Deals",
      desc: "Shop now and enjoy amazing discounts today.",
    },
  ];

  return (
    <div className="ms-5 mb-5 overflow-hidden rounded-2xl border">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index}>
            <div
              className="relative flex h-[300px] items-center bg-cover bg-center md:h-[450px]"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >

              <div className="relative z-10 max-w-xl px-6 md:px-12 text-green-900">
                <h1 className="mb-4 text-3xl font-bold md:text-5xl">
                  {slide.title}
                </h1>

                <p className="text-sm md:text-lg">
                  {slide.desc}
                </p>

                <button className="mt-4 rounded-lg bg-green-900 px-6 py-3 text-white font-bold  hover:bg-green-600 transition-colors transition duration-300 hover:cursor-pointer">
                  <h5>Shop Now</h5>
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}