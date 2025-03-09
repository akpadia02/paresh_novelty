"use client"; 

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getProductsByCategory } from "@/lib/firestore/products/read_server";
import { ProductCard } from "../../products/[productId]/components/ProductCard";
import { getCategory } from "@/lib/firestore/categories/read_server";

export default function Page() {
    const { categoryId } = useParams();  
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState(null); // Store category data

    useEffect(() => {
        if (!categoryId) return;

        const fetchData = async () => {
            try {
                const categoryData = await getCategory({ id: categoryId });
                setCategory(categoryData);

                const productsData = await getProductsByCategory({ categoryId });
                setProducts(productsData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [categoryId]);

    if (!categoryId) {
        return <div className="text-center text-red-500">Error: Category ID not found</div>;
    }

    return (
        <main className="p-5 flex justify-center md:px-10 md:py-6 w-full font-playfair">
            <div className="w-full flex justify-center">
                <div className="flex flex-col gap-6">
                    <h1 className="text-center font-semibold text-4xl">
                        {category ? category.name : "Loading..."} {/* Handle loading state */}
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {products?.map((item) => (
                            <ProductCard product={item} key={item?.id} />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
