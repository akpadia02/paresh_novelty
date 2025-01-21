"use client"
import { Button } from '@nextui-org/react'
import React, { use, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import { getCollection } from '@/lib/firestore/collections/read_server';
import { createNewCollection, updateCollection } from '@/lib/firestore/collections/write';
import { useProduct, useProducts } from '@/lib/firestore/products/read';
import { X } from 'lucide-react';



function Form() {
    const [data, setData] = useState(null);
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { data: products } = useProducts({ pageLimit: 2000 })

    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const router = useRouter();

    const fetchData = async () => {
        try {
            const res = await getCollection({ id: id });
            if (!res) {
                toast.error("Collection Not Found!");
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
                await createNewCollection({
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

        if (!data?.title) {
            toast.error("Title is required");
            return;
        }

        if (!data?.id) {
            toast.error("Invalid category ID");
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

            console.log("Updating collection with:", data);

            await updateCollection({
                data,
                image: base64Image,
            });

            toast.success("Collection updated successfully.");
            setData(null);
            setImage(null);
            router.push(`/admin/collections`);
        } catch (error) {
            console.error("Error updating collection:", error);
            toast.error(error.message || "Failed to update collection.");
        } finally {
            setIsLoading(false);
            console.log("Update process completed");
        }
    };





    return (
        <div className='flex flex-col gap-3 bg-[#fbe1e3] rounded-xl p-6 w-full md:w-[400px]'>
            <h1 className='font-semibold'>{id ? "Update" : "Create"} Collection </h1>
            <form className='flex flex-col gap-3'
                onSubmit={(e) => {
                    e.preventDefault();
                    if (id) {
                        handleUpdate();
                    } else {
                        handleCreate();
                    }
                }}>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='collection-title' className='text-gray-500 text-sm'>Title <span className='text-red-500'>*</span></label>
                    <input
                        id='collection-title'
                        name='collection-title'
                        type="text"
                        placeholder='Enter Title'
                        value={data?.title ?? ""}
                        onChange={(e) => {
                            handleData(("title"), e.target.value);
                        }}
                        className='border px-4 py-2 rounded-lg w-full focus:outline-none'
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='collection-sub-title' className='text-gray-500 text-sm'>Sub Title <span className='text-red-500'>*</span></label>
                    <input
                        id='collection-sub-title'
                        name='collection-sub-title'
                        type="text"
                        placeholder='Enter Sub Title'
                        value={data?.subTitle ?? ""}
                        onChange={(e) => {
                            handleData(("subTitle"), e.target.value);
                        }}
                        className='border px-4 py-2 rounded-lg w-full focus:outline-none'
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='category-name' className='text-gray-500 text-sm'>Image <span className='text-red-500'>*</span></label>
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
                        id='category-image'
                        name='category-image'
                        type="file"
                        className='border px-4 py-2 rounded-lg w-full focus:outline-none'
                    />
                </div>
                <div className="flex flex-wrap gap-3">
                    {data?.products?.map((productId) => {
                        return (
                            <ProductCard
                                productId={productId}
                                key={productId}
                                setData={setData}
                            />
                        );
                    })}
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='collection-products' className='text-gray-500 text-sm'> Select Product <span className='text-red-500'>*</span></label>
                    <select
                        id='collection-products'
                        name='collection-products'
                        type="text"
                        onChange={(e) => {
                            setData((prevData) => {
                                let list = [...(prevData?.products ?? [])];
                                list.push(e.target.value);
                                return {
                                    ...prevData,
                                    products: list,
                                }
                            })
                        }}
                        className='border px-4 py-2 rounded-lg w-full focus:outline-none'
                    >
                        <option value="">Select Product</option>
                        {products?.map((item) => {
                            return <option  disabled={data?.products?.includes(item?.id)} value={item?.id}>{item?.title}</option>
                        })}
                    </select>
                </div>

                <Button isLoading={isLoading} isDisabled={isLoading} className='bg-[#FEC4C7]' type='submit'>
                    {id ? "Update" : "Create"}
                </Button>
            </form>
        </div>
    )
}

export default Form


function ProductCard({ productId, setData }) {
    const { data: product } = useProduct({ productId: productId });
    return (
      <div className="flex gap-3 bg-[#FEC4C7] px-4 py-1 rounded-full text-sm">
        <h2>{product?.title}</h2>
        <button
          onClick={(e) => {
            e.preventDefault();
            setData((prevData) => {
              let list = [...prevData?.products];
              list = list?.filter((item) => item != productId);
              return {
                ...prevData,
                products: list,
              };
            });
          }}
        >
          <X size={12} />
        </button>
      </div>
    );
  }