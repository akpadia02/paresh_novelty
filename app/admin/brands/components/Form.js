"use client"
import { Button } from '@nextui-org/react'
import React, { use, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import { getBrand } from '@/lib/firestore/brands/read_server';
import { createNewBrand, updateBrand } from '@/lib/firestore/brands/write';



function Form() {
    const [data, setData] = useState(null);
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const router = useRouter();

    const fetchData = async () => {
        try {
            const res = await getBrand({ id: id });
            if (!res) {
                toast.error("Brand Not Found!");
            } else {
                setData(res);
            }
        } catch (error) {
            console.error(error);
            toast.error(error?.message);
        }
    }

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id]);

    const handleData = (key, value) => {
        setData((preData) => {
            return {
                ...(preData ?? {}),
                [key]: value,
            };
        });
    };

    const handleCreate = async () => {
        setIsLoading(true);
        if (!image) {
            alert("Image is required");
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = async () => {
            try {
                await createNewBrand({
                    data,
                    image: reader.result, // Pass the base64 string
                });
                // alert("Category created successfully!");
                toast.success("Successfully Created.");
                setData(null);
                setImage(null);
            } catch (error) {
                console.error(error);
                //alert("Error creating category: " + error.message);
                toast.error(error?.message);
            }
        };
        setIsLoading(false);
    };

    const handleUpdate = async (event) => {
        event?.preventDefault(); // Prevent default form behavior
        if (isLoading) {
            console.log("Update already in progress");
            return;
        }
    
        console.log("handleUpdate triggered");
    
        if (!data?.name) {
            toast.error("Name is required");
            return;
        }
    
        if (!data?.id) {
            toast.error("Invalid brand ID");
            return;
        }
    
        setIsLoading(true);
    
        try {
            let base64Image = null;
    
            if (image) {
                const reader = new FileReader();
                const base64Promise = new Promise((resolve, reject) => {
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = () => reject("Failed to read image");
                });
    
                reader.readAsDataURL(image);
                base64Image = await base64Promise;
            }
    
            console.log("Updating brand with:", data);
    
            await updateBrand({
                data,
                image: base64Image,
            });
    
            toast.success("Brand updated successfully.");
            setData(null);
            setImage(null);
            router.push(`/admin/brands`);
        } catch (error) {
            console.error("Error updating brand:", error);
            toast.error(error.message || "Failed to update brand.");
        } finally {
            setIsLoading(false);
            console.log("Update process completed");
        }
    };
    
      



    return (
        <div className='flex flex-col gap-3 bg-[#fbe1e3] rounded-xl p-6 w-full md:w-[400px]'>
            <h1 className='font-semibold'>{id ? "Update" : "Create"} Brand </h1>
            <form className='flex flex-col gap-3'
                onSubmit={(e) => {
                    e.preventDefault();
                    if (id) {
                        handleUpdate();
                    }else{
                        handleCreate();
                    }
                }}>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='brand-name' className='text-gray-500 text-sm'>Name <span className='text-red-500'>*</span></label>
                    <input
                        id='brand-name'
                        name='brand-name'
                        type="text"
                        placeholder='Enter Name'
                        value={data?.name ?? ""}
                        onChange={(e) => {
                            handleData(("name"), e.target.value);
                        }}
                        className='border px-4 py-2 rounded-lg w-full focus:outline-none'
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='brand-name' className='text-gray-500 text-sm'>Image <span className='text-red-500'>*</span></label>
                    {image && (
                        <div className='flex justify-center items-center p-3'>
                            <img src={URL.createObjectURL(image)} className='h-28' alt='' />
                        </div>
                    )}
                    <input
                        onChange={(e) => {
                            if (e.target.files.length > 0) {
                                setImage(e.target.files[0]);
                            }
                        }}
                        id='brand-image'
                        name='brand-image'
                        type="file"
                        className='border px-4 py-2 rounded-lg w-full focus:outline-none'
                    />
                </div>
                <Button isLoading={isLoading} isDisabled={isLoading} className='bg-[#FEC4C7]' type='submit'>
                    {id ? "Update" : "Create"}
                </Button>
            </form>
        </div>
    )
}

export default Form