import React from 'react'

function Description({ product }) {
    return (
        <div className='flex flex-col gap-2 py-6'>
            <h2 className='text-sm font-semibold'>
                Description
            </h2>
            <div className='text-gray-600'>{product?.description ?? ""}</div>
        </div>
    )
}

export default Description