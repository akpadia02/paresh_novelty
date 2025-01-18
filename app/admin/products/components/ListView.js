'use client'
import { db } from '@/lib/firebase';
import { useProducts } from '@/lib/firestore/products/read';
import { deleteProduct } from '@/lib/firestore/products/write';
import { Button, CircularProgress } from '@nextui-org/react';
import { doc, getDoc } from 'firebase/firestore';
import { Edit2, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

function ListView() {
    const { data: products, error, isLoading } = useProducts();

    if (isLoading) {
        return <div><CircularProgress /></div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='flex-1 md:pr-5 md:px-0 px-5 rounded-xl flex flex-col gap-3 w-full overflow-x-auto'>
            <table className='border-separate border-spacing-y-3'>
                <thead>
                    <tr>
                        <th className='font-semibold border-y bg-[#fbe1e3] px-3 py-2 border-l rounded-l-lg'>SrNo.</th>
                        <th className='font-semibold  border-y bg-[#fbe1e3] px-3 py-2'>Image</th>
                        <th className='font-semibold  border-y bg-[#fbe1e3] px-3 py-2 text-left'>Title</th>
                        <th className='font-semibold  border-y bg-[#fbe1e3] px-3 py-2 text-left'>Price</th>
                        <th className='font-semibold  border-y bg-[#fbe1e3] px-3 py-2 text-left'>Stock</th>
                        <th className='font-semibold  border-y bg-[#fbe1e3] px-3 py-2 text-left'>Orders</th>
                        <th className='font-semibold  border-y bg-[#fbe1e3] px-3 py-2 text-left'>Status</th>
                        <th className='font-semibold  border-y bg-[#fbe1e3] px-3 py-2 border-r rounded-r-lg text-left'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products?.map((item, index) => {
                        return (
                            <Row index={index} item={item} key={item.id} />
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ListView;


function Row({ item, index }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        if (!confirm("Are you sure?")) return;

        setIsDeleting(true);
        try {
            // Get the category document from Firestore
            const productRef = doc(db, `products/${item?.id}`);
            const productDoc = await getDoc(productRef);

            if (!productDoc.exists()) {
                toast.error("Product not found");
                setIsDeleting(false);
                return;
            }

            const productData = productDoc.data();
            const featureImageUrl = productData?.featureImageUrl;

            if (featureImageUrl) {
                // Extract the public_id from the image URL (Cloudinary URL format)
                const publicId = featureImageUrl.split('/').slice(-2).join('/').split('.')[0];

                // Call API route to delete the image from Cloudinary
                const response = await fetch('/api/deleteImage', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ publicId }),
                });

                if (!response.ok) {
                    throw new Error("Failed to delete image from Cloudinary");
                }
            }

            // Delete the category from Firestore
            await deleteProduct({ id: item?.id });

            toast.success("Successfully Deleted");
        } catch (error) {
            toast.error(error.message);
        }
        setIsDeleting(false);
    };

    const handleUpdate = () => {
        router.push(`/admin/products/form?id=${item?.id}`);
    };

    return (
        <tr>
            <td className='border-y bg-[#fbe1e3] px-3 py-2 border-l rounded-l-lg text-center'>{index + 1}</td>
            <td className='border-y bg-[#fbe1e3] px-3 py-2'>
                <div className='flex justify-center'>
                    {console.log("Item data:", item)} {/* Log the entire item */}
                    {console.log("Image URL:", item?.featureImageUrl)}  {/* Log the image URL */}
                    <img
                        src={item?.featureImageUrl}
                        alt="Product Image"
                        className="h-10 w-9 object-cover"
                        onError={(e) => {
                            console.log("Image failed to load.");
                        }}
                        onLoad={() => console.log("Image loaded successfully:", item?.featureImageUrl)}
                    />
                </div>


            </td>
            <td className='border-y bg-[#fbe1e3] px-3 py-2 whitespace-nowrap'>{item?.title}</td>
            <td className='border-y bg-[#fbe1e3] px-3 py-2 whitespace-nowrap'>
                {item?.salePrice < item?.price && (
                    <span className='text-xs text-gray-500 line-through'>
                        ₹ {item?.price}
                    </span>
                )}{" "}
                ₹{item?.salePrice}
            </td>
            <td className='border-y bg-[#fbe1e3] px-3 py-2'>{item?.stock}</td>
            <td className='border-y bg-[#fbe1e3] px-3 py-2'>{item?.orders ?? 0}</td>
            <td className='border-y bg-[#fbe1e3] px-3 py-2'>
                <div className='flex'>
                    {(item?.stock - (item?.orders ?? 0)) > 0 && <div className='px-2 py-1 text-xs font-semibold text-green-500 bg-green-100 rounded-md'>Available</div>}
                    {(item?.stock - (item?.orders ?? 0)) <= 0 && <div className='px-2 py-1 text-xs text-red-500 font-semibold bg-red-100 rounded-md'>Out Of Stock</div>}
                </div>
            </td>
            <td className='border-y bg-[#fbe1e3] px-3 py-2 border-r rounded-r-lg'>
                <div className='flex gap-2 items-center'>
                    <Button onPress={handleUpdate} isIconOnly size='sm'>
                        <Edit2 size={13} />
                    </Button>
                    <Button onPress={handleDelete} isLoading={isDeleting} isDisabled={isDeleting} isIconOnly size='sm' color='danger'>
                        <Trash2 size={13} />
                    </Button>
                </div>
            </td>
        </tr>
    );
}
