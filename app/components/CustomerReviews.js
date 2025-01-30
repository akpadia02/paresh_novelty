import React from 'react';
import Rating from '@mui/material/Rating';


const list = [
    {
        name: "Lorem ipsum",
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        rating: 4.5,
        imageUrl: "https://i.postimg.cc/j5x7BkHZ/person.jpg"
    },
    {
        name: "Lorem ipsum",
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        rating: 4.0,
        imageUrl: "https://i.postimg.cc/j5x7BkHZ/person.jpg"
    },
    {
        name: "Lorem ipsum",
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        rating: 3.5,
        imageUrl: "https://i.postimg.cc/j5x7BkHZ/person.jpg"
    },
]

function CustomerReviews() {
    return (
        <section className='flex justify-center font-playfair'>
            <div className='md:max-w-[900px] w-[420px] md:w-full p-5 flex flex-col gap-3'>
            <h2 className="text-2xl font-bold mb-6 text-center">Customer's Review</h2>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    {list?.map((item) => {
                        return (
                            <div   key={item.id}  className='flex flex-col gap-2 p-4 rounded-lg justify-center items-center border' style={{ borderColor: '#FEC4C7' }}>
                                <img src={item?.imageUrl} className='h-32 w-32 rounded-full object-cover' alt=''></img>
                                <h1 className='text-xl font-semibold'>{item?.name}</h1>
                                <Rating size="small" name="customer-rating" defaultValue={item?.rating} precision={item?.rating} readOnly />
                                <p className='text-sm text-gray-500 text-center'>{item?.message}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default CustomerReviews