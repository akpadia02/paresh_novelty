"use client";
import React from "react";
import AboveNav from "./AboveNav";
import Header from "./Header";
import { Rating } from "@mui/material";
import { Button } from "@nextui-org/react";
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function ProductsList({ products }) {
    return (
        <>
            <AboveNav />
            <Header />
            <div className="w-full p-5 font-playfair">
                <h2 className="text-2xl font-bold mb-6 text-center">All Products</h2>
                <div className="flex flex-wrap justify-center gap-6">
                    {products.map((product, index) => (
                        <div
                            key={index}
                            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-all w-64"
                        >
                            <div className="relative group">
                                <img
                                    src={product.featureImageUrl}
                                    alt={product.title}
                                    className="h-48 w-full object-cover rounded-md group-hover:opacity-0 transition-opacity duration-300"
                                />
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
                                    <button className="bg-[#FEC4C7] flex-1 px-4 py-2 rounded-full text-white hover:bg-[#fbe1e3] transition-all">
                                        Buy Now
                                    </button>
                                    <Button isIconOnly size="sm" variant="bordered" className="border border-[#FEC4C7] text-[#FEC4C7] bg-transparent hover:bg-[#fbe1e3] transition-all">
                                        <ShoppingCart size={20} />
                                    </Button>
                                    <Button isIconOnly size="sm" className="border border-[#FEC4C7] text-[#FEC4C7] bg-transparent hover:bg-[#fbe1e3] transition-all">
                                        <Heart size={20} />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
