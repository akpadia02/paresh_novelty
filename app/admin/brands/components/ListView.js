"use client"


import { db } from '@/lib/firebase';
import { useBrands } from '@/lib/firestore/brands/read';
import { deleteBrand } from '@/lib/firestore/brands/write';
import { Button, CircularProgress } from '@nextui-org/react';
import { doc, getDoc } from 'firebase/firestore';
import { Edit2, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

function ListView() {
  const { data: brands, error, isLoading } = useBrands();

  if (isLoading) {
    return <div>
      <CircularProgress />
    </div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className='flex-1 md:pr-5 md:px-0 px-5 rounded-xl flex flex-col gap-3'>
      <h1 className='text-xl'>Brands</h1>
      <table className='border-separate border-spacing-y-3'>
        <thead>
          <tr>
            <th className='font-semibold border-y bg-[#fbe1e3] px-3 py-2 border-l rounded-l-lg'>SrNo.</th>
            <th className='font-semibold  border-y bg-[#fbe1e3] px-3 py-2'>Image</th>
            <th className='font-semibold  border-y bg-[#fbe1e3] px-3 py-2 text-left'>Name</th>
            <th className='font-semibold  border-y bg-[#fbe1e3] px-3 py-2 border-r rounded-r-lg text-left'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {brands?.map((item, index) => {
            return (
              <Row index={index} item={item} key={item.id} />
            )
          })}
        </tbody>

      </table>
    </div>
  )
}

export default ListView


function Row({ item, index }) {

  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure?")) return;
  
    setIsDeleting(true);
    try {
      // Get the category document from Firestore
      const brandRef = doc(db, `brands/${item?.id}`);
      const brandDoc = await getDoc(brandRef);
  
      if (!brandDoc.exists()) {
        toast.error("Brand not found");
        setIsDeleting(false);
        return;
      }
  
      const brandData = brandDoc.data();
      const imageURL = brandData?.imageURL;
  
      if (imageURL) {
        // Extract the public_id from the image URL (Cloudinary URL format)
        // Assuming the URL is in the format: https://res.cloudinary.com/dcvc04m9h/image/upload/v1735724898/categories/ipgl0cv2gntmjgt3vnbq.jpg
        const publicId = imageURL.split('/').slice(-2).join('/').split('.')[0];
  
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
      await deleteBrand({ id: item?.id });
  
      toast.success("Successfully Deleted");
    } catch (error) {
      toast.error(error.message);
    }
    setIsDeleting(false);
  };
  
  const handleUpdate = () => {
    router.push(`/admin/brands?id=${item?.id}`);
  }

  return (
    <tr>
      <td className='border-y bg-[#fbe1e3] px-3 py-2 border-l rounded-l-lg text-center'>{index + 1}</td>
      <td className='border-y bg-[#fbe1e3] px-3 py-2'>
        <div className='flex justify-center'>
          <img className='h-10 w-9 object-cover' src={item?.imageURL} alt='' />
        </div>
      </td>
      <td className='border-y bg-[#fbe1e3] px-3 py-2'>{item.name}</td>
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