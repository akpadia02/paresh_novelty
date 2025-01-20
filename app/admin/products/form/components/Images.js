import React from 'react';

function Images({ data, featureImage, setFeatureImage, imageList, setImageList }) {
    return (
        <section className='flex flex-col gap-4 p-4 bg-[#fbe1e3] border rounded-xl shadow-md'>
            <h1 className='font-semibold'>Images</h1>
            <div className='p-4 bg-white rounded-lg shadow-inner border'>
                {/* Feature Image Section */}
                <div className='flex flex-col gap-1'>
                    {data?.featureImageUrl && !featureImage && (
                        <div className='flex justify-center'>
                            <img
                                className='h-24 w-20 object-cover rounded-lg'
                                src={data?.featureImageUrl}
                                alt='' />
                        </div>
                    )}
                    {featureImage && (
                        <div className='flex justify-center'>
                            <img
                                className='h-24 w-20 object-cover rounded-lg'
                                src={URL.createObjectURL(featureImage)}
                                alt='' />
                        </div>
                    )}
                    <label htmlFor='product-feature-image' className='text-gray-500 text-xs'>
                        Feature Image<span className='text-red-500'>*</span>
                    </label>
                    <input
                        type='file'
                        id='product-feature-image'
                        name='product-feature-image'
                        onChange={(e) => {
                            if (e.target.files.length > 0) {
                                setFeatureImage(e.target.files[0]);
                            }
                        }}
                        className='border px-4 py-2 rounded-lg w-full outline-none'/>
                </div>

                {/* Image List Section */}
                <div className='flex flex-col gap-1'>
                    {(imageList?.length === 0) && data?.imageList?.length!=0 && (
                        <div className='flex flex-wrap gap-4'>
                            {data?.imageList?.map((item, index) => (
                                <img key={index} className='w-20 h-24 object-cover rounded-lg' src={item} alt='' />
                            ))}
                        </div>
                    )}
                    {imageList?.length > 0 && (
                        <div className='flex flex-wrap gap-4'>
                            {imageList?.map((item, index) => (
                                <img key={index} className='w-20 h-24 object-cover rounded-lg' src={URL.createObjectURL(item)} alt='' />
                            ))}
                        </div>
                    )}
                    <label htmlFor='product-images' className='text-gray-500 text-xs'>
                        Images<span className='text-red-500'>*</span>
                    </label>
                    <input
                        type='file'
                        id='product-images'
                        name='product-images'
                        multiple
                        onChange={(e) => {
                            const newFiles = [];
                            for (let i = 0; i < e.target.files.length; i++) {
                                newFiles.push(e.target.files[i]);
                            }
                            setImageList(newFiles);
                        }}
                        className='border px-4 py-2 rounded-lg w-full outline-none'/>
                </div>
            </div>
        </section>
    );
}

export default Images;




// import React from 'react'

// function Images({ data, featureImage, setFeatureImage, imageList, setImageList }) {
//     return (
//         // flex-1 divide equal basic details and image
//         <section className='bg-[#fbe1e3] flex-1 flex flex-col gap-3 rounded-xl p-4 border'>
//             <h1 className='font-semibold'>Images</h1>
//             <div className='flex flex-col gap-1'>
//                 {featureImage && (
//                     <div className='flex justify-center'>
//                         <img className='h-24 w-20 object-cover rounded-lg' src={URL.createObjectURL(featureImage)} alt='' />
//                     </div>
//                 )}
//                 <label htmlFor='product-feature-image' className='text-gray-500 text-xs'>Feature Image<span className='text-red-500'>*</span></label>
//                 <input
//                     type='file'
//                     id='product-feature-image'
//                     name='product-feature-image'
//                     onChange={(e) => {
//                         if (e.target.files.length > 0) {
//                             setFeatureImage(e.target.files[0]);
//                         }
//                     }}
//                     className='border px-4 py-2 rounded-lg w-full outline-none' required />
//             </div>
//             <div className='flex flex-col gap-1'>
//                 {imageList?.length > 0 &&
//                     <div className='flex flex-wrap gap-4'>
//                         {imageList?.map((item) => {
//                             return <img className='w-20 h-24 object-cover rounded-lg' src={URL.createObjectURL(item)} alt='' />
//                         })}
//                     </div>}
//                 <label htmlFor='product-images' className='text-gray-500 text-xs'>Images<span className='text-red-500'>*</span></label>
//                 <input
//                     type='file'
//                     id='product-images'
//                     name='product-images'
//                     multiple
//                     onChange={(e) => {
//                         const newFiles = [];
//                         for(let i=0;i<e.target.files.length;i++){
//                             newFiles.push(e.target.files[i]);
//                         }
//                         setImageList(newFiles);
//                     }}
//                     className='border px-4 py-2 rounded-lg w-full outline-none' required />
//             </div>
//         </section>
//     )
// }

// export default Images