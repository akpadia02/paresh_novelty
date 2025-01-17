
import Link from 'next/link'
import React from 'react'
import ListView from './components/ListView'

function page() {
  return (
    <main className='flex flex-col gap-4 p-5'>
      <div className='flex justify-between items-center'>
        <h1 className='text-xl'>Products</h1>
        <Link href={`/admin/products/form`}>
          <button className='bg-[#fbe1e3] px-4 py-2 rounded-lg text-sm font-semibold'>Create</button>
        </Link>
      </div>
      <ListView />
    </main>
  )
}

export default page