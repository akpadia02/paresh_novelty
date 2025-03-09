import { getProductsByCategory } from "@/lib/firestore/products/read_server";
import { ProductCard } from "./ProductCard";

export default async function RelatedProducts({ categoryId }) {
    if (!categoryId) return null;

    const products = await getProductsByCategory({categoryId:categoryId});

    return (
        <div className="w-full flex justify-center">
            <div className="flex flex-col gap-5">
                <h1 className="text-center font-semibold text-2xl mt-16">Related Products</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {products?.map((item) => (
                        <ProductCard product={item} key={item?.id} />
                    ))}
                </div>
            </div>
        </div>
    );
}
