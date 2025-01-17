"use client"
import { useBrands } from '@/lib/firestore/brands/read';
import { useCategories } from '@/lib/firestore/categories/read';
import React from 'react'

function BasicDetails({ data, handleData }) {
    const {data : brands } = useBrands();
    const {data : categories } = useCategories();
    return (
        <section className='bg-[#fbe1e3] flex-1 flex flex-col gap-3 rounded-xl p-4 border h-[580px]'>
            <h1 className='font-semibold'>Basic Details</h1>
            <div className='flex flex-col gap-1'>
                <label htmlFor='product-title' className='text-gray-500 text-xs'>Product Title<span className='text-red-500'>*</span></label>
                <input
                    type='text'
                    placeholder='Enter Title'
                    id='product-title'
                    name='product-title'
                    value={data?.title ?? ""}
                    onChange={(e)=>{
                        handleData("title",e.target.value);
                    }}
                    className='border px-4 py-2 rounded-lg w-full outline-none' required/>
            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor='product-short-discription' className='text-gray-500 text-xs'>Short Discription<span className='text-red-500'>*</span></label>
                <input
                    type='text'
                    placeholder='Enter Short Discription'
                    id='product-short-discription'
                    name='product-short-discription'
                    value={data?.shortDescription ?? ""}
                    onChange={(e)=>{
                        handleData("shortDescription",e.target.value);
                    }}
                    className='border px-4 py-2 rounded-lg w-full outline-none' required/>
            </div>
            {/* not required */}
            <div className='flex flex-col gap-1'>
                <label htmlFor='product-brand' className='text-gray-500 text-xs'>Brand</label>
                <select
                    type='text'
                    id='product-brand'
                    name='product-brand'
                    value={data?.brandId ?? ""}
                    onChange={(e)=>{
                        handleData("brandId",e.target.value);
                    }}
                    className='border px-4 py-2 rounded-lg w-full outline-none'>
                        <option value="">Select Brand</option>
                        {brands?.map((item)=>{
                            return <option value={item?.id} key={item?.id}>{item?.name}</option>
                        })}
                    </select>
            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor='product-category' className='text-gray-500 text-xs'>Category<span className='text-red-500'>*</span></label>
                <select
                    type='text'
                    id='product-category'
                    name='product-category'
                    value={data?.categoryId ?? ""}
                    onChange={(e)=>{
                        handleData("categoryId",e.target.value);
                    }}
                    className='border px-4 py-2 rounded-lg w-full outline-none' required>
                        <option value="">Select Category</option>
                        {categories?.map((item)=>{
                            return <option value={item?.id} key={item?.id}>{item?.name}</option>
                        })}
                    </select>
            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor='product-stock' className='text-gray-500 text-xs'>Stock<span className='text-red-500'>*</span></label>
                <input
                    type='number'
                    placeholder='Enter Stock'
                    id='product-stock'
                    name='product-stock'
                    value={data?.stock ?? ""}
                    onChange={(e)=>{
                        handleData("stock",e.target.valueAsNumber);
                    }}
                    className='border px-4 py-2 rounded-lg w-full outline-none' required/>
            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor='product-price' className='text-gray-500 text-xs'>Price<span className='text-red-500'>*</span></label>
                <input
                    type='number'
                    placeholder='Enter Price'
                    id='product-price'
                    name='product-price'
                    value={data?.price ?? ""}
                    onChange={(e)=>{
                        handleData("price",e.target.valueAsNumber);
                    }}
                    className='border px-4 py-2 rounded-lg w-full outline-none' required/>
            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor='product-sale-price' className='text-gray-500 text-xs'>Sale Price<span className='text-red-500'>*</span></label>
                <input
                    type='number'
                    placeholder='Enter Sale Price'
                    id='product-sale-price'
                    name='product-sale-price'
                    value={data?.salePrice ?? ""}
                    onChange={(e)=>{
                        handleData("salePrice",e.target.valueAsNumber);
                    }}
                    className='border px-4 py-2 rounded-lg w-full outline-none' required/>
            </div>
        </section>
    )
}

export default BasicDetails