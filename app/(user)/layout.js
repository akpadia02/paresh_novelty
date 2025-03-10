"use client"

import AuthContextProvider, { useAuth } from "@/context/AuthContext";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { CircularProgress } from "@nextui-org/react";
import Link from "next/link";

export default function Layout({ children }) {
    return <main className="font-playfair">
        <Header />
        <AuthContextProvider>
            <UserChecking>
                <section className="min-h-screen">
                    {children}
                </section>
            </UserChecking>
        </AuthContextProvider>
        <Footer />
    </main>
}

function UserChecking({ children }) {
    const { user, isLoading } = useAuth();
    if (isLoading) {
        return (
            <div className="h-screen w-full flex justify-center items-center">
                <CircularProgress />
            </div>
        );
    }
    if (!user) {
        return (
            <div className="h-96 w-full flex flex-col gap-3 justify-center items-center">
                <h1>You are not Logged In!</h1>
                <Link href={'/login'}>
                <button className="text-black px-4 py-2 rounded-xl bg-[#FEC4C7]">Login</button>
                </Link>
            </div>
        );
    }
    return <>{children}</>
}