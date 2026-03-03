// app/product/[productId]/PageClient.js (Client Component)
// "use client";
import React from "react";
import Photos from "./Photos";
import Details from "./Details";
import Review from "./Review";
import Description from "./Description";
import RelatedProducts from "./RelatedProducts";


export default function PageClient({ product }) {
  return (
    <main className="md:p-10 p-5 font-playfair">
      {/* Photo & Details */}
      <section className="flex flex-col md:flex-row gap-3">
        <Photos imageList={[product?.featureImageUrl, ...(product?.imageList ?? [])]} />
        <Details product={product} />
      </section>
      {/* Description & Reviews */}
      <section className="mt-6">
        {/* <Description product={product} /> */}
        <Review productId={product?.id} />
      </section>
      {/* Related Products */}
      <RelatedProducts categoryId={product?.categoryId} />
    </main>
  );
}
