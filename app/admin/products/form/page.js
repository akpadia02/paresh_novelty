"use client";

import React, { useState } from 'react'
import BasicDetails from './components/BasicDetails';
import Images from './components/Images';
import Description from './components/Description';
import { Button } from '@nextui-org/react';
import toast from 'react-hot-toast';
import { createNewProduct } from '@/lib/firestore/products/write';

function page() {
    const [data, setData] = useState(null);
    const [featureImage, setFeatureImage] = useState(null);
    const [imageList, setImageList] = useState([]);
    const [isLoading,setIsLoading]=useState(false);

    /*The setData function returns a new object containing all the previous 
    properties of prevData along with the new key-value pair. 
    This triggers a re-render of the component with the updated state.*/
    const handleData = (key, value) => {
        setData((prevData) => {
            return {
                ...(prevData ?? {}),
                [key]: value,
            };
        });
    };


    const handleSubmit = async () => {
        setIsLoading(true);
    
        if (!featureImage) {
            alert("Feature Image is required");
            setIsLoading(false);
            return;
        }
    
        if (!data?.title) {
            alert("Title is required");
            setIsLoading(false);
            return;
        }
    
        // Convert featureImage to base64
        const featureImageReader = new FileReader();
        featureImageReader.readAsDataURL(featureImage);
    
        featureImageReader.onload = async () => {
            try {
                const featureImageBase64 = featureImageReader.result;
    
                // Convert each image in imageList to base64
                const imageListBase64 = await Promise.all(
                    imageList.map((image) => {
                        return new Promise((resolve, reject) => {
                            const reader = new FileReader();
                            reader.readAsDataURL(image);
                            reader.onload = () => resolve(reader.result);
                            reader.onerror = (error) => reject(error);
                        });
                    })
                );
    
                // Call createNewProduct with the base64 images
                await createNewProduct({
                    data,
                    featureImage: featureImageBase64,
                    imageList: imageListBase64,
                });
    
                toast.success("Product successfully created.");
                setData(null);
                setFeatureImage(null);
                setImageList([]);
            } catch (error) {
                console.error(error);
                toast.error(error?.message);
            } finally {
                setIsLoading(false);
            }
        };
    
        featureImageReader.onerror = (error) => {
            console.error("Error reading feature image:", error);
            toast.error("Error reading feature image.");
            setIsLoading(false);
        };
    };
    

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
        }} className='p-5 flex flex-col gap-4'>
            <div className='flex justify-between w-full items-center'>
                <h1 className='text-lg font-semibold'> Create New Product </h1>
                <Button isLoading={isLoading} isDisabled={isLoading} type='submit' className='bg-[#fbe1e3]'>Create</Button>
            </div>
            <div className='flex flex-col gap-5 md:flex-row'>
                <BasicDetails data={data} handleData={handleData} />
                <div className='flex-1 flex flex-col gap-5'>
                    <Images data={data} featureImage={featureImage} setFeatureImage={setFeatureImage} imageList={imageList} setImageList={setImageList} />
                    <Description data={data} handleData={handleData} />
                </div>
            </div>
        </form>
    )
}

export default page

