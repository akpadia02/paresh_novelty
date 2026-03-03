"use client";

import React from "react";

export default function AboutPage() {
  return (
    <main className="font-playfair px-5 py-8 md:px-16">
      <section className="max-w-4xl mx-auto space-y-5">
        <h1 className="text-2xl md:text-3xl font-semibold">About Paresh Novelty</h1>
        <p className="text-sm md:text-base text-gray-700">
          Paresh Novelty is your trusted wholesaler for{" "}
          <span className="font-semibold">
            fancy bindis, bangles, ladies&apos; novelties, general items and imitation
            jewellery
          </span>
          . From traditional favourites to modern designs, we carefully curate every
          piece so that your shop or collection always feels fresh and festive.
        </p>
        <p className="text-sm md:text-base text-gray-700">
          Based in the heart of Itwari, Nagpur, we have been serving retailers and
          customers across India with a simple promise —{" "}
          <span className="font-semibold">
            quality products at the best possible prices
          </span>
          . Whether you are stocking up for the festive season, weddings, or everyday
          wear, our catalogue offers a wide range of styles and price points.
        </p>
        <p className="text-sm md:text-base text-gray-700">
          This online store brings the same Paresh Novelty experience to the digital
          world. Browse featured collections, place bulk or single orders and track
          your purchases easily from your account. Behind the scenes, every order is
          handled with care so it reaches you safely and on time.
        </p>

        <div className="mt-4 border border-[#FEC4C7] rounded-2xl p-4 bg-[#fff7f8] text-sm text-gray-800 space-y-1">
          <h2 className="text-lg font-semibold mb-1">Store Information</h2>
          <p>
            <span className="font-semibold">Address:</span> Bohra Masjid Road,
            Itwari, Nagpur - 440002.
          </p>
          <p>
            <span className="font-semibold">Phone:</span> +91 9421700364 / 9423100105 / 9764878007
          </p>
          <p>
            <span className="font-semibold">Tel:</span> 0712 - 2728946
          </p>
          <p>
            <span className="font-semibold">Email:</span>{" "}
            <a
              href="mailto:PareshNovelty@Gmail.Com"
              className="underline underline-offset-2"
            >
              PareshNovelty@Gmail.Com
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}

