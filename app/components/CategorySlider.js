"use client";
import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";

function CategorySlider({ categories }) {
  const settings = {
    dots: false, // Remove dots
    infinite: true,
    speed: 5000, // Increased transition speed
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, // Increased auto slide time
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3, slidesToScroll: 1 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <div className="py-10 px-4 md:px-16 bg-[#f8f8f8] font-playfair">
      <h2 className="text-2xl font-bold mb-6 text-center">Categories</h2>
      <Slider {...settings}>
        {categories.map((category) => (
          <div key={category._id || category.slug} className="px-2">
            <Link href={`/categories/${category?.id}`}>
              <div className="relative bg-gray-100 h-60 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
                <Image
                  src={category?.imageURL}
                  alt={category.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="text-center mt-4 text-lg font-medium">
                {category.name}
              </h2>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CategorySlider;
