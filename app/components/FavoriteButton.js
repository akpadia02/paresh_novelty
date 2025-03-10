"use client";


import { Button } from "@nextui-org/react";
import { useState } from "react";
import toast from "react-hot-toast";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/lib/firestore/users/read";
import { updateFavorites } from "@/lib/firestore/users/write";

export default function FavoriteButton({ productId }) {
  const { user } = useAuth();
  const { data } = useUser({ uid: user?.uid });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    setIsLoading(true);
    try {
      if (!user?.uid) {
        router.push("/login");
        throw new Error("Please Logged In First!");
      }
      if (data?.favorites?.includes(productId)) {
        const newList = data?.favorites?.filter((item) => item != productId);
        await updateFavorites({ list: newList, uid: user?.uid });
      } else {
        await updateFavorites({
          list: [...(data?.favorites ?? []), productId],
          uid: user?.uid,
        });
      }
    } catch (error) {
      toast.error(error?.message);
    }
    setIsLoading(false);
  };

  const isLiked = data?.favorites?.includes(productId);

  return (
    <Button
      isLoading={isLoading}
      isDisabled={isLoading}
      onPress={handleClick}
      variant={isLiked ? "solid" : "bordered"}
      color="danger"
      isIconOnly
      size="sm"
      className={`transition-all ${isLiked
          ? "bg-[#FEC4C7] text-white"
          : "border border-[#FEC4C7] text-[#FEC4C7] bg-transparent hover:bg-[#fbe1e3]"
        }`}
    >
      {isLiked ? (
        <FavoriteIcon fontSize="small" />
      ) : (
        <FavoriteBorderOutlinedIcon fontSize="small" />
      )}
    </Button>
  );
}





//className="border border-[#FEC4C7] text-[#FEC4C7] bg-transparent hover:bg-[#fbe1e3] transition-all"

// import { useAuth } from "@/contexts/AuthContext";
// import { useUser } from "@/lib/firestore/user/read";
// import { updateFavorites } from "@/lib/firestore/user/write";
// import { Button } from "@nextui-org/react";
// import { useState } from "react";
// import toast from "react-hot-toast";
// import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import { useRouter } from "next/navigation";

// export default function FavoriteButton({ productId }) {
//   const { user } = useAuth();
//   const { data } = useUser({ uid: user?.uid });
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   const handlClick = async () => {
//     setIsLoading(true);
//     try {
//       if (!user?.uid) {
//         router.push("/login");
//         throw new Error("Please Logged In First!");
//       }
//       if (data?.favorites?.includes(productId)) {
//         const newList = data?.favorites?.filter((item) => item != productId);
//         await updateFavorites({ list: newList, uid: user?.uid });
//       } else {
//         await updateFavorites({
//           list: [...(data?.favorites ?? []), productId],
//           uid: user?.uid,
//         });
//       }
//     } catch (error) {
//       toast.error(error?.message);
//     }
//     setIsLoading(false);
//   };

//   const isLiked = data?.favorites?.includes(productId);

//   return (
//     <Button
//       isLoading={isLoading}
//       isDisabled={isLoading}
//       onClick={handlClick}
//       variant="light"
//       color="danger"
//       className="rounded-full"
//       isIconOnly
//       size="sm"
//     >
//       {!isLiked && <FavoriteBorderOutlinedIcon fontSize="small" />}
//       {isLiked && <FavoriteIcon fontSize="small" />}
//     </Button>
//   );
// }




