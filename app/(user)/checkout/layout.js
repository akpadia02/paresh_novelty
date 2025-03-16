"use client"

import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/lib/firestore/users/read";
import { CircularProgress } from "@nextui-org/react";
import { SearchCheck } from "lucide-react";
import { useSearchParams } from "next/navigation"

export default function Layout({ children }) {
    const { user } = useAuth();
    const searchParams = useSearchParams();
    const type = searchParams.get("type");
    const productId = searchParams.get("productId");

    const { data, isLoading, error } = useUser({ uid: user.uid });

    if(isLoading){
        return(
            <div>
                <CircularProgress />
            </div>
        )
    }

    if(error){
        return <div>{error}</div>
    }

    if (type === 'cart' && (!data?.carts || data?.carts?.length === 0)) {
        return (
            <div>
                <h2>Your Cart is Empty</h2>
            </div>
        )
    }

    if(type === 'buynow' && !productId){
        return <div>
            <h1>Product Not Found!</h1>
        </div>
    }



    return <>
        {children}
    </>
}