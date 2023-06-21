import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <header className='bg-green-500 px-6 flex items-center h-[80px] justify-between text-white'>
        <h1 className='text-[35px]'>School Communities</h1>
        <nav>
            <ul className='flex gap-6'>
                <li className='text-[20px]'>
                    <Link href={'/'}>Home</Link>
                </li>
                <li className='text-[20px]'>
                    <Link href={'/create_community'}>Create-Community</Link>
                </li>
                <li className='text-[20px]'>
                    <Link href={'/communities'}>Communities</Link>
                </li>
            </ul>
        </nav>

    </header>
  )
}

export default Navbar