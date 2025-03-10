"use client"

import { useAuth } from "@/context/AuthContext"
import { useProduct } from "@/lib/firestore/products/read";
import { useUser } from "@/lib/firestore/users/read";
import { updateCarts } from "@/lib/firestore/users/write";
import { Button, CircularProgress } from "@nextui-org/react";
import { Minus, Plus, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";


export default function Page() {
  const { user } = useAuth();
  const { data, isLoading } = useUser({ uid: user?.uid });
  if (isLoading) {
    return (
      <div className="p-10 flex w-full justify-center">
        <CircularProgress />
      </div>
    );
  }
  return (
    <main className="p-5 flex flex-col gap-3 justify-center items-center font-playfair">
      <h1 className="text-2xl font-semibold">Cart</h1>
      {(!data?.carts || data?.carts?.length === 0) && (
        <div className="flex flex-col gap-5 justify-center items-center h-full w-full py-20">
          <div className="flex justify-center">
            <img className="h-[400px]" src="/assets/Empty-cuate.svg" alt="" />
          </div>
          <h1 className="text-gray-600 font-semibold">
            Please Add Products To Cart
          </h1>
        </div>
      )}
      <div className="p-5 gap-6 grid grid-cols-1 md:grid-cols-3">
        {data?.carts?.map((item, key) => {
          return <ProductItem item={item} key={item?.id} />;
        })}
      </div>
      <div>
        <Link href={`/checkout?type=cart`}>
          <button className="bg-[#FEC4C7] text-black px-5 py-2 text-sm rounded-lg">
            Checkout
          </button>
        </Link>
      </div>
    </main>
  )
}

function ProductItem({ item }) {
  const { user } = useAuth();
  const { data } = useUser({ uid: user?.uid });

  const [isRemoving, setIsRemoving] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const { data: product } = useProduct({ productId: item?.id });

  const handleRemove = async () => {
    if (!confirm("Are you sure?")) return;
    setIsRemoving(true);
    try {
      const newList = data?.carts?.filter((d) => d?.id != item?.id);
      await updateCarts({ list: newList, uid: user?.uid });
    } catch (error) {
      toast.error(error?.message);
    }
    setIsRemoving(false);
  }
  const handleUpdate = async (quantity) => {
    setIsUpdating(true);
    try {
      const newList = data?.carts?.map((d) => {
        if (d?.id === item?.id) {
          return {
            ...d,
            quantity: parseInt(quantity),
          };
        } else {
          return d;
        }
      });
      await updateCarts({ list: newList, uid: user?.uid });
    } catch (error) {
      toast.error(error?.message);
    }
    setIsUpdating(false);
  };

  return (
    <div className="flex gap-3 items-center border px-3 py-3 rounded-xl">
      <div className="h-20 w-20 p-1">
        <img
          className="w-full h-full object-cover rounded-lg"
          src={product?.featureImageUrl}
          alt=""
        />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <h1 className="text-sm font-semibold">{product?.title}</h1>
        <h1 className="text-green-500 text-sm">
          ₹ {product?.salePrice}{" "}
          <span className="line-through text-xs text-gray-500">
            ₹ {product?.price}
          </span>
        </h1>
        <div className="flex text-xs items-center gap-2">
          <Button
            onPress={() => {
              handleUpdate(item?.quantity - 1);
            }}
            isDisabled={isUpdating || item?.quantity <= 1}
            isIconOnly
            size="sm"
            className="h-6 w-4"
          >
            <Minus size={12} />
          </Button>
          <h2>{item?.quantity}</h2>
          <Button
            onPress={() => {
              handleUpdate(item?.quantity + 1);
            }}
            isDisabled={isUpdating}
            isIconOnly
            size="sm"
            className="h-6 w-4"
          >
            <Plus size={12} />
          </Button>
        </div>
      </div>
      <div className="flex gap-3 items-center">
        <Button
          onPress={handleRemove}
          isLoading={isRemoving}
          isDisabled={isRemoving}
          isIconOnly
          style={{ backgroundColor: "#FEC4C7" }} // Light blue background with dark gray text
          size="sm"
        >
          <X size={13} />
        </Button>
      </div>
    </div>
  );
}