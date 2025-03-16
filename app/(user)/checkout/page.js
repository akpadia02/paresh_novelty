"use client"

import { useAuth } from "@/context/AuthContext"
import { useProductsByIds } from "@/lib/firestore/products/read";
import { useUser } from "@/lib/firestore/users/read";
import { CircularProgress } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import Chcekout from "./components/Checkout";
import Checkout from "./components/Checkout";

export default function Page() {
    const { user } = useAuth();
    const { data } = useUser({ uid: user?.uid });

    const searchParams = useSearchParams();
    const type = searchParams.get("type");
    const productId = searchParams.get("productId");

    const productIdsList = (type === 'buynow') ? [productId] : data?.carts?.map((item)=>item?.id);


    const {data:products, error, isLoading} = useProductsByIds({idsList:productIdsList});

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

    if(productIdsList?.length === 0 && !productIdsList){
        return <div>
            <h1>Products Not Found</h1>
        </div>
    }

    // const productList =[
    //     {
    //         quantity:1,
    //         product:{
    //             id,
    //             name,
    //         }
    //     }
    // ]
    
    const productList = (type === 'buynow') ? [
        {
            id: productId,
            quantity: 1,
            product: products[0],
        }
    ]: data?.carts?.map((item)=>{
        return {
            ...item,
            product: products?.find((e)=>e?.id === item?.id),
        }
    })

    return <>
        <main className="p-5 flex flex-col gap-4">
            <h1 className="text-xl">Checkout</h1>
            <Checkout productList={productList}/>
        </main>
    </>
}