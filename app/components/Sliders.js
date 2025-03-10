"use client";
import React from "react";
import Slider from "react-slick";
import Link from "next/link";

function FeaturedCategorySlider({ featuredCategories }) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
    };

    return (
        <div className="overflow-hidden w-full font-playfair">
            <Slider {...settings}>
                {featuredCategories?.map((category, index) => (
                    <div key={index}>
                        <div className="flex flex-col-reverse md:flex-row gap-4 bg-[#f8f8f8] p-5 md:px-24 md:py-20 w-full">
                            {/* Content Section */}
                            <div className="flex-1 flex flex-col justify-center gap-4 md:gap-10">
                                <h2 className="text-gray-500 text-xs md:text-base">
                                    TRENDING CATEGORY
                                </h2>
                                <div className="flex flex-col gap-4">
                                    <h1 className="text-4xl lg:text-5xl 2xl:text-6xl font-extrabold text-[#2d2d2d] drop-shadow-md">
                                        {category.name}
                                    </h1>
                                    <p className="text-gray-600 text-sm md:text-base max-w-xl md:line-clamp-3">
                                        {category.slug}
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Link href={`/categories/${category?.id}`}>
                                        <button className="bg-[#FEC4C7] px-6 py-2 rounded-full shadow-lg hover:bg-[#fbe1e3] transition-all duration-300">
                                            Shop Now
                                        </button>
                                    </Link>
                                    <a href="#category-slider">
                                        <button className="border-2 border-[#FEC4C7] text-[#2d2d2d] px-6 py-2 rounded-full hover:bg-[#fbe1e3] transition-all duration-300">
                                            See More Categories
                                        </button>
                                    </a>
                                </div>
                            </div>
                            {/* Image Section */}
                            <div className="flex-1">
                                <img
                                    className="h-[14rem] md:h-[23rem] w-full object-cover hover-pop-effect"
                                    src={category?.imageURL}
                                    alt={category.name}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>

            <style jsx>{`
        .slick-dots {
          position: absolute;
          bottom: 16px;
          left: 50%;
          transform: translateX(-50%);
          display: flex !important;
          gap: 8px;
        }

        .slick-dots li {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #d1d1d1;
          cursor: pointer;
        }

        .slick-dots li.slick-active {
          background-color: #2d2d2d;
          transform: scale(1.2);
        }

        .hover-pop-effect {
          transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .hover-pop-effect:hover {
          transform: scale(1.15);
          box-shadow: 0px 15px 25px rgba(0, 0, 0, 0.2);
        }
      `}</style>
        </div>
    );
}

export default FeaturedCategorySlider;



// "use client";
// import React from "react";
// import Slider from "react-slick";

// function FeaturedCategorySlider({ featuredCategories }) {
//     const settings = {
//         dots: true,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 1,
//         slidesToScroll: 1
//     };
//     return (
//         <div className="slider-container">
//             <Slider {...settings}>
//                 {featuredCategories?.map((category) => {
//                     return (
//                         <div>
//                             <div className="bg-[#f8f8f8] flex gap-4 p-10 md:p-20 w-full font-playfair">
//                                 <div className="flex-1 flex flex-col gap-5">
//                                     <h1 className="text-4xl font-semibold">{category.name}</h1>
//                                     {/* line-clamp-3 */}
//                                     <h1 className="text-gray-600 text-sm max-w-96">{category.slug}</h1>
//                                     <div className="flex gap-4">
//                                         <button className="bg-[#fbe1e3] px-4 py-2">Shop Now</button>
//                                         <button className="border-[#fbe1e3] border-2 px-4 py-2">See More Categories</button>
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <img className="h-[20rem]" src={category?.imageURL} alt="" />
//                                 </div>
//                             </div>
//                         </div>
//                     )
//                 })}
//             </Slider>
//         </div>
//     );
// }

// export default FeaturedCategorySlider;


///


// "use client";
// import React from "react";
// import Slider from "react-slick";

// function FeaturedCategorySlider({ featuredCategories }) {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     pauseOnHover: true,
//   };

//   return (
//     <div className="relative h-[calc(100vh-80px)] overflow-hidden">
//       <Slider {...settings}>
//         {featuredCategories?.map((category, index) => (
//           <div key={index}>
//             <div className="flex flex-col xl:flex-row h-full">
//               {/* Left Content */}
//   <div className="h-1/2 xl:w-1/2 xl:h-full flex flex-col justify-center items-center text-center xl:text-left p-8 xl:p-16 gap-4 xl:gap-6">
//     <h2 className="text-lg md:text-xl text-gray-700">TRENDING CATEGORY</h2>
//     <h1 className="text-4xl lg:text-5xl 2xl:text-6xl font-extrabold text-[#2d2d2d] drop-shadow-md">
//       {category.name}
//     </h1>
//     <p className="text-gray-600 text-base md:text-lg max-w-2xl font-light leading-relaxed">
//       {category.slug}
//     </p>
//     <div className="flex flex-wrap gap-4 mt-4">
//       <button className="bg-[#FEC4C7] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#fbe1e3] transition-colors duration-300">
//         Shop Now
//       </button>
//       <button className="border-2 border-[#FEC4C7] text-[#2d2d2d] px-6 py-3 rounded-full hover:bg-[#fbe1e3] transition-all duration-300">
//         See More Categories
//       </button>
//     </div>
//               </div>

//               {/* Right Image */}
//               <div className="relative h-1/2 xl:w-1/2 xl:h-full">
//                 <img
//                   className="w-full h-full object-cover"
//                   src={category?.imageURL}
//                   alt={category.name}
//                 />
//               </div>
//             </div>
//           </div>
//         ))}
//       </Slider>

//       <style jsx>{`
//         .slick-dots {
//           position: absolute;
//           bottom: 16px;
//           left: 50%;
//           transform: translateX(-50%);
//           display: flex !important;
//           gap: 8px;
//         }

//         .slick-dots li {
//           width: 10px;
//           height: 10px;
//           border-radius: 50%;
//           background-color: #d1d1d1;
//           cursor: pointer;
//         }

//         .slick-dots li.slick-active {
//           background-color: #2d2d2d;
//           transform: scale(1.2);
//         }

//         .animate-fade-in {
//           animation: fadeIn 1.5s ease-in-out;
//         }

//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

// export default FeaturedCategorySlider;







//final
// "use client";
// import React from "react";
// import Slider from "react-slick";

// function FeaturedCategorySlider({ featuredCategories }) {
//     const settings = {
//         dots: true,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         autoplay: true,
//         autoplaySpeed: 3000,
//         pauseOnHover: true,
//     };

//     return (
//         <div className="overflow-hidden w-full font-playfair">
//             <Slider {...settings}>
//                 {featuredCategories?.map((category, index) => (
//                     <div key={index}>
//                         <div className="flex flex-col-reverse md:flex-row gap-4 bg-[#f8f8f8] p-5 md:px-24 md:py-20 w-full">
//                             {/* Content Section */}
//                             <div className="flex-1 flex flex-col justify-center gap-4 md:gap-10">
//                                 <h2 className="text-gray-500 text-xs md:text-base">
//                                     TRENDING CATEGORY
//                                 </h2>
//                                 <div className="flex flex-col gap-4">
//                                     <h1 className="text-4xl lg:text-5xl 2xl:text-6xl font-extrabold text-[#2d2d2d] drop-shadow-md">
//                                         {category.name}
//                                     </h1>
//                                     <p className="text-gray-600 text-sm md:text-base max-w-xl md:line-clamp-3">
//                                         {category.slug}
//                                     </p>
//                                 </div>
//                                 <div className="flex items-center gap-4">
//                                     <button className="bg-[#FEC4C7] px-6 py-2 rounded-full shadow-lg hover:bg-[#fbe1e3] transition-all duration-300">
//                                         Shop Now
//                                     </button>
//                                     <button className="border-2 border-[#FEC4C7] text-[#2d2d2d] px-6 py-2 rounded-full hover:bg-[#fbe1e3] transition-all duration-300">
//                                         See More Categories
//                                     </button>
//                                 </div>
//                             </div>
//                             {/* Image Section */}
//                             <div className="flex-1">
//                                 <img
//                                     className="h-[14rem] md:h-[23rem] w-full object-cover hover-pop-effect"
//                                     src={category?.imageURL}
//                                     alt={category.name}
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </Slider>

//             <style jsx>{`
//         .slick-dots {
//           position: absolute;
//           bottom: 16px;
//           left: 50%;
//           transform: translateX(-50%);
//           display: flex !important;
//           gap: 8px;
//         }

//         .slick-dots li {
//           width: 10px;
//           height: 10px;
//           border-radius: 50%;
//           background-color: #d1d1d1;
//           cursor: pointer;
//         }

//         .slick-dots li.slick-active {
//           background-color: #2d2d2d;
//           transform: scale(1.2);
//         }

//         .hover-pop-effect {
//           transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
//         }

//         .hover-pop-effect:hover {
//           transform: scale(1.15);
//           box-shadow: 0px 15px 25px rgba(0, 0, 0, 0.2);
//         }
//       `}</style>
//         </div>
//     );
// }

// export default FeaturedCategorySlider;
