import Image from "next/image";
import AboveNav from "./components/AboveNav";
import Header from "./components/Header";
import FeaturedCategorySlider from "./components/Sliders";
import { getAllCategories, getFeaturedCategories } from "@/lib/firestore/categories/read_server";
import FeaturedProducts from "./components/FeaturedProducts";
import { getFeaturedProducts } from "@/lib/firestore/products/read_server";
import Footer from "./components/Footer";
import CategorySlider from "./components/CategorySlider";
import CustomerReviews from "./components/CustomerReviews";
import AboutUs from "./components/AboutUs";

export default async function Home() {
  // const featuredCategories = await getFeaturedCategories();
  // const featuredProducts = await getFeaturedProducts();
  // const categories = await getAllCategories();


  //fetch at together once
  const [featuredCategories, featuredProducts, categories] = await Promise.all([
    getFeaturedCategories(),
    getFeaturedProducts(),
    getAllCategories(),
  ])
  return (
    <main>
      <AboveNav />
      <Header />
      <FeaturedCategorySlider featuredCategories={featuredCategories}/>
      <FeaturedProducts featuredProducts={featuredProducts}/>
      <CategorySlider categories={categories}/>
      <CustomerReviews />
      {/* <AboutUs /> */}
      <Footer />
    </main>
  );
}
