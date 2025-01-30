
import { getAllProducts } from "@/lib/firestore/products/read_server"; // ✅ Server-side function
import ProductsList from "../components/ProductsList";

export default async function ProductsPage() {
    const products = await getAllProducts(); // ✅ Fetch products on the server

    return <ProductsList products={products} />;
}
