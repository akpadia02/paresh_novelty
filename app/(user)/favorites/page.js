// "use client";

// import { ProductCard } from "@/app/components/ProductsList";
// import { useAuth } from "@/context/AuthContext";
// import { useProduct } from "@/lib/firestore/products/read";
// import { useUser } from "@/lib/firestore/users/read";
// import { CircularProgress } from "@nextui-org/react";



// export default function Page() {
//   const { user } = useAuth();
//   const { data, isLoading } = useUser({ uid: user?.uid });
//   if (isLoading) {
//     return (
//       <div className="p-10 flex w-full justify-center">
//         <CircularProgress />
//       </div>
//     );
//   }
//   return (
//     <main className="flex flex-col gap-3 justify-center items-center p-5">
//       <h1 className="text-2xl font-semibold">Favorites</h1>
//       {(!data?.favorites || data?.favorites?.length === 0) && (
//         <div className="flex flex-col gap-5 justify-center items-center h-full w-full py-20">
//           <div className="flex justify-center">
//             <img className="h-[200px]" src="/svgs/Empty-pana.svg" alt="" />
//           </div>
//           <h1 className="text-gray-600 font-semibold">
//             Please Add Products To Favorites
//           </h1>
//         </div>
//       )}
//       <div className="p-5 w-full md:max-w-[900px] gap-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
//         {data?.favorites?.map((productId) => {
//           return <ProductItem productId={productId} key={productId} />;
//         })}
//       </div>
//     </main>
//   );
// }

// function ProductItem({ productId }) {
//   const { data: product } = useProduct({ productId: productId });
//   //console.log(product);
//   return (
//     <div className="w-full font-playfair">
//       {/* <h2 className="text-2xl font-bold mb-6 text-center">All Products</h2> */}
//       <div className="flex flex-wrap justify-center gap-6">
//         <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-all w-64">
//           <div className="relative group">
//             <img
//               src={product.featureImageUrl}
//               alt={product.title}
//               className="h-48 w-full object-cover rounded-md group-hover:opacity-0 transition-opacity duration-300"
//             />
//             {product.imageList?.[0] && (
//               <img
//                 src={product.imageList[0]}
//                 alt={product.title}
//                 className="h-48 w-full object-cover rounded-md absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//               />
//             )}
//           </div>
//           <h3 className="text-lg font-bold text-gray-800 mt-4 text-center">{product.title}</h3>
//           <p className="text-gray-500 text-sm text-center">{product.shortDescription}</p>
//           <div className="flex gap-3 items-center mt-4">
//             <Rating size="small" name="product-rating" defaultValue={2.5} precision={0.5} readOnly />
//             <h1 className="text-sx text-gray-400">(0)</h1>
//           </div>
//           <div className="flex gap-2 items-center text-lg font-semibold">
//             {product.salePrice < product.price ? (
//               <>
//                 ₹ {product.salePrice}{" "}
//                 <span className="line-through text-sm text-gray-600">₹ {product.price}</span>
//               </>
//             ) : (
//               <span>₹ {product.price}</span>
//             )}
//           </div>
//           <div className="flex justify-between items-center mt-2">
//             <div className="flex items-center gap-6">
//               <button className="bg-[#FEC4C7] flex-1 px-2 py-2 rounded-full text-white hover:bg-[#fbe1e3] transition-all">
//                 Buy Now
//               </button>
//               <Button isIconOnly size="sm" variant="bordered" className="border border-[#FEC4C7] text-[#FEC4C7] bg-transparent hover:bg-[#fbe1e3] transition-all">
//                 <ShoppingCart size={20} />
//               </Button>
//               <Button isIconOnly size="sm" className="border border-[#FEC4C7] text-[#FEC4C7] bg-transparent hover:bg-[#fbe1e3] transition-all">
//                 <Heart size={20} />
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


"use client"

import FavoriteButton from "@/app/components/FavoriteButton";
import AuthContextProvider, { useAuth } from "@/context/AuthContext"
import { useProduct } from "@/lib/firestore/products/read";
import { useUser } from "@/lib/firestore/users/read";
import { Rating } from "@mui/material";
import { Button } from "@nextui-org/react";
import { Heart, ShoppingCart } from "lucide-react";

export default function Page() {
  const { user } = useAuth();
  const { data } = useUser({ uid: user?.uid });
  return (
    <main className="p-5 flex flex-col gap-3 justify-center items-center font-playfair">
      <h1 className="text-2xl font-semibold">Favorites</h1>
      {(!data?.favorites || data?.favorites?.length === 0) && (
        <div className="flex flex-col gap-5 justify-center items-center h-full w-full py-20">
          <div className="flex justify-center">
            <img className="h-[200px]" src="/svgs/Empty-pana.svg" alt="" />
          </div>
          <h1 className="text-gray-600 font-semibold">
            Please Add Products To Favorites
          </h1>
        </div>
      )}
      <div className="p-5 gap-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {data?.favorites?.map((productId) => {
          return <ProductItem productId={productId} key={productId} />;
        })}
      </div>
    </main>
  )
}

function ProductItem({ productId }) {
  const { data: product, isLoading, error } = useProduct({ productId });

  console.log("Fetching product:", productId, "Data:", product, "Error:", error);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching product</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="w-full font-playfair">
      {/* <h2 className="text-2xl font-bold mb-6 text-center">All Products</h2> */}
      <div className="flex flex-wrap justify-center md:mt-0 mt-3">
        <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-all w-64">
          <div className="relative group">
            <img
              src={product.featureImageUrl}
              alt={product.title}
              className="h-48 w-full object-cover rounded-md group-hover:opacity-0 transition-opacity duration-300"
            />
            {product.imageList?.[0] && (
              <img
                src={product.imageList[0]}
                alt={product.title}
                className="h-48 w-full object-cover rounded-md absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            )}
          </div>
          <h3 className="text-lg font-bold text-gray-800 mt-4 text-center">{product.title}</h3>
          <p className="text-gray-500 text-sm text-center">{product.shortDescription}</p>
          <div className="flex gap-3 items-center mt-4">
            <Rating size="small" name="product-rating" defaultValue={2.5} precision={0.5} readOnly />
            <h1 className="text-sx text-gray-400">(0)</h1>
          </div>
          <div className="flex gap-2 items-center text-lg font-semibold">
            {product.salePrice < product.price ? (
              <>
                ₹ {product.salePrice}{" "}
                <span className="line-through text-sm text-gray-600">₹ {product.price}</span>
              </>
            ) : (
              <span>₹ {product.price}</span>
            )}
          </div>
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center gap-6">
              <button className="bg-[#FEC4C7] flex-1 px-2 py-2 rounded-full text-white hover:bg-[#fbe1e3] transition-all">
                Buy Now
              </button>
              <Button isIconOnly size="sm" variant="bordered" className="border border-[#FEC4C7] text-[#FEC4C7] bg-transparent hover:bg-[#fbe1e3] transition-all">
                <ShoppingCart size={20} />
              </Button>
              <AuthContextProvider>
                <FavoriteButton productId={product?.id} />
              </AuthContextProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}