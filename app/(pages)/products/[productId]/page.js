// "use client"
// import { getProduct } from '@/lib/firestore/products/read_server';
// import React from 'react'
// import Photos from './components/Photos';
// import Details from './components/Details';

import PageServer from "./components/pageServer";

// async function Page({ params }) {
//   const { productId } = params;
//   const product = await getProduct({ id: productId })
//   return (
//     <main className='md:p-10 p-5'>
//       {/* Photo & Details */}
//       <section className='flex gap-3'>
//         <Photos imageList={[product?.featureImageUrl, ...(product?.imageList ?? [])]} />
//         <Details product={product}/>
//       </section>
//       {/* Description & Reviews */}
//       <section>
//         <div></div>
//         <div></div>
//       </section>
//       {/* Related Products */}
//       <section>

//       </section>
//     </main>
//   )
// }

// export default Page



// app/product/[productId]/page.js


export default function Page({ params }) {
  return <PageServer params={params} />;
}
