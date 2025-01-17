import Link from 'next/link'
import React from 'react'

function page() {
    return (
        <>
            <main className='p-10'>
                <h1>DashBoard</h1>
                <Link href='/admin'>
                    Admin Panel
                </Link>
            </main>
        </>
    )
}

export default page