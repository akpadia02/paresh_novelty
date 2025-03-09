"use client";
import { getAllProducts } from "@/lib/firestore/products/read_server";
import { Rating } from "@mui/material";
import { Button } from "@nextui-org/react";
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function FeaturedProducts({ featuredProducts }) {
    const router = useRouter();
    return (
        <div className="w-full p-5 font-playfair">
            <h2 className="text-2xl font-bold mb-6 text-center">Featured Products</h2>
            <div className="flex flex-wrap justify-center gap-6">
                {featuredProducts.map((product, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-all w-64"
                    >
                        <div className="relative group">
                            {/* Default Image */}
                            <img
                                src={product.featureImageUrl}
                                alt={product.title}
                                className="h-48 w-full object-cover rounded-md group-hover:opacity-0 transition-opacity duration-300 line-clamp-2"
                            />
                            {/* Hover Image */}
                            {product.imageList[0] && (
                                <img
                                    src={product.imageList[0]}
                                    alt={product.title}
                                    className="h-48 w-full object-cover rounded-md absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                />
                            )}

                        </div>
                        <Link href={`/products/${product?.id}`}>
                            <h3 className="text-lg font-bold text-gray-800 mt-4 text-center">{product.title}</h3></Link>
                        <p className="text-gray-500 text-sm text-center">{product.shortDescription}</p>
                        <div className="flex gap-3 items-center mt-4">
                            <Rating size="small" name="product-rating" defaultValue={2.5} precision={0.5} readOnly />
                            <h1 className="text-sx text-gray-400">(0)</h1>
                        </div>
                        <div className="flex gap-2 items-center text-lg font-semibold">
                            {product?.salePrice < product?.price && (
                                <>
                                    ₹ {product?.salePrice}{" "}
                                    <span className="line-through text-sm text-gray-600">₹ {product?.price}</span>
                                </>
                            )}
                            {product?.salePrice === product?.price && (
                                <span>₹ {product?.price}</span>
                            )}
                        </div>

                        <div className="flex justify-between items-center mt-2">
                            <div className="flex items-center gap-6">
                                <button className="bg-[#FEC4C7] flex-1 px-4 py-2 rounded-full text-white hover:bg-[#fbe1e3] transition-all">
                                    Buy Now
                                </button>
                                <Button
                                    isIconOnly
                                    size="sm"
                                    variant="bordered"
                                    className="border border-[#FEC4C7] text-[#FEC4C7] bg-transparent hover:bg-[#fbe1e3] transition-all"
                                >
                                    <ShoppingCart size={20} />
                                </Button>
                                <Button
                                    isIconOnly
                                    size="sm"
                                    className="border border-[#FEC4C7] text-[#FEC4C7] bg-transparent hover:bg-[#fbe1e3] transition-all"
                                >
                                    <Heart size={20} />
                                </Button>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-6">
                <button
                    className="bg-[#FEC4C7] text-white px-6 py-3 rounded-lg text-sm hover:bg-[#fbe1e3] transition-all"
                    onClick={() => router.push("/products")} // Navigate to products page
                >
                    View All Products
                </button>
            </div>
        </div>
    );
}

export default FeaturedProducts;



//
// "use client";
// import React from "react";

// function FeaturedProducts({ featuredProducts }) {
//     return (
//         <div className="w-full p-5 font-playfair">
//             <h2 className="text-2xl font-bold mb-6 text-center">Featured Products</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//                 {featuredProducts.map((product, index) => (
//                     <div
//                         key={index}
//                         className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-all"
//                     >
//                         <div className="relative group">
//                             {/* Default image */}
//                             <img
//                                 src={product.featureImageUrl}
//                                 alt={product.title}
//                                 className="h-48 w-full object-cover rounded-md mb-4 group-hover:opacity-0 transition-opacity duration-300"
//                             />
//                             {/* Hover image */}
//                             {product.imageList[0] && (
//                                 <img
//                                     src={product.imageList[0]}
//                                     alt={product.title}
//                                     className="h-48 w-full object-cover rounded-md mb-4 absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                                 />
//                             )}
//                         </div>
//                         <h3 className="text-lg font-bold text-gray-800">{product.title}</h3>
//                         <p className="text-gray-500 text-sm">{product.shortDescription}</p>
//                         <div className="flex justify-between items-center mt-4">
//                             <span className="text-lg font-semibold text-[#2d2d2d]">
//                             ₹{product.price}
//                             </span>
//                             <button className="bg-[#FEC4C7] px-4 py-2 rounded-full text-white hover:bg-[#fbe1e3] transition-all">
//                                 Add to Cart
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default FeaturedProducts;




///
// "use client";
// import { Heart } from "lucide-react";
// import React from "react";

// function FeaturedProducts({ featuredProducts }) {
//   return (
//     <div
//       className="relative bg-fixed bg-cover bg-center"
//       style={{
//         backgroundImage: "url('https://images.unsplash.com/photo-1542291026-7eec264c27ff?fit=crop&w=1600&h=900')",
//       }}
//     >
//       {/* Overlay for better readability */}
//       <div className="bg-black bg-opacity-50 w-full h-full py-16">
//         <div className="w-full p-5 font-playfair">
//           <h2 className="text-3xl font-bold mb-10 text-center text-white">
//             Featured Products
//           </h2>
//           <div className="flex flex-wrap justify-center gap-6">
//             {featuredProducts.map((product, index) => (
//               <div
//                 key={index}
//                 className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-all w-64"
//               >
//                 <div className="relative group">
//                   {/* Default Image */}
//                   <img
//                     src={product.featureImageUrl}
//                     alt={product.title}
//                     className="h-48 w-full object-cover rounded-md group-hover:opacity-0 transition-opacity duration-300"
//                   />
//                   {/* Hover Image */}
//                   {product.imageList[0] && (
//                     <img
//                       src={product.imageList[0]}
//                       alt={product.title}
//                       className="h-48 w-full object-cover rounded-md absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                     />
//                   )}
//                 </div>
//                 <h3 className="text-lg font-bold text-gray-800 mt-4 text-center">
//                   {product.title}
//                 </h3>
//                 <p className="text-gray-500 text-sm text-center">
//                   {product.shortDescription}
//                 </p>
//                 <div className="flex justify-between items-center mt-4">
//                   <span className="text-lg font-semibold text-[#2d2d2d]">
//                     ₹{product.price}
//                   </span>
//                   <button className="bg-[#FEC4C7] px-4 py-2 rounded-full text-white hover:bg-[#fbe1e3] transition-all">
//                     Add to Cart
//                   </button>
//                   <button className="px-4 py-2 rounded-full text-[#FEC4C7] hover:bg-[#fbe1e3] transition-all">
//                     <Heart />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default FeaturedProducts;
