"use client";


import { Button } from "@nextui-org/react";
import { useState } from "react";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/lib/firestore/users/read";
import { updateCarts, updateFavorites } from "@/lib/firestore/users/write";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


/*/users/{uid}
//favorites:[]
//carts:[
//{
    id:"dmekndl",
    quantity:3,
//}
//]*/

export default function AddToCartButton({ productId }) {
    const { user } = useAuth();
    const { data } = useUser({ uid: user?.uid });
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const isAdded = data?.carts?.find((item) => item?.id === productId);

    const handleClick = async () => {
        setIsLoading(true);
        try {
            if (!user?.uid) {
                router.push("/login");
                throw new Error("Please Logged In First!");
            }
            if (data?.carts?.includes(productId)) {
                const newList = data?.carts?.filter((item) => item != productId);
                await updateCarts({ list: newList, uid: user?.uid });
            } else {
                await updateCarts({
                    list: [...(data?.carts ?? []), { id: productId, quantity: 1 }],
                    uid: user?.uid,
                });
            }
        } catch (error) {
            toast.error(error?.message);
        }
        setIsLoading(false);
    };


    return (
        <Button
            isLoading={isLoading}
            isDisabled={isLoading}
            onPress={handleClick}
            variant={isAdded ? "solid" : "bordered"}
            color="danger"
            isIconOnly
            size="sm"
            className={`transition-all ${isAdded
                ? "bg-[#FEC4C7] text-white"
                : "border border-[#FEC4C7] text-[#FEC4C7] bg-transparent hover:bg-[#fbe1e3]"
                }`}
        >
            {isAdded ? (
                <ShoppingCartIcon fontSize="small" />
            ) : (
                <AddShoppingCartIcon fontSize="small" />
            )}
        </Button>
    );
}