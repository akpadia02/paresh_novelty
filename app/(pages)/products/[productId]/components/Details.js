import { getCategory } from '@/lib/firestore/categories/read_server'
import { Button } from '@nextui-org/react'
import { Heart, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function Details({ product }) {
    return (
        <div className='w-full flex flex-col gap-3'>
            <div className='flex'>
                <Category categoryId={product?.categoryId} />
            </div>
            {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. */}
            <h1 className='font-semibold text-xl md:text-4xl'>{product?.title}</h1>
            {/* line-clamp-3 md:line-clamp-4 */}
            <h2 className='text-gray-600 text-sm w-auto'>{product?.shortDescription}</h2>
            <h3 className='font-semibold text-xl'>{product.salePrice < product.price ? (
                <>
                    ₹ {product.salePrice}{" "}
                    <span className="line-through text-sm text-gray-600">₹ {product.price}</span>
                </>
            ) : (
                <span>₹ {product.price}</span>
            )}</h3>
            <div className='flex flex-wrap items-center gap-3'>
                <button className="bg-[#FEC4C7] px-4 py-2 rounded-full text-white hover:bg-[#fbe1e3] transition-all">
                    Buy Now
                </button>

                <button className="border border-[#FEC4C7] text-[#FEC4C7] px-4 py-2 rounded-full hover:bg-[#fbe1e3] transition-all">
                    Add to Cart
                </button>
                <Button
                    isIconOnly
                    size="sm"
                    className="border border-[#FEC4C7] text-[#FEC4C7] bg-transparent hover:bg-[#fbe1e3] transition-all"
                >
                    <Heart size={20} />
                </Button>
                <div className='flex flex-col gap-2 py-6'>
                    {/* <h2 className='text-sm font-semibold'>
                        Description
                    </h2> */}
                    <div className='text-gray-600'>{product?.description ?? ""}</div>
                </div>
            </div>
        </div>
    )
}

export default Details


async function Category({ categoryId }) {
    const category = await getCategory({ id: categoryId })
    return (
        <Link href={`/categories/${categoryId}`}>
            <div className='flex items-center gap-2 px-3 py-1 rounded-full bg-[#fbe1e3] border'>
                <img className='h-5 rounded-full' src={category?.imageURL} alt='' />
                <h4 className='text-sm'>{category?.name}</h4>
            </div>
        </Link>
    )

}