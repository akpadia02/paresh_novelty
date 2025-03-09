import AboveNav from "../components/AboveNav";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Layout({children}){
    return (
        <main className="font-playfair">
            <AboveNav />
            <Header />
            {children}
            <Footer />
        </main>
    )
}