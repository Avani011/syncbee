import React from 'react'
import Link from 'next/link'

const Hero = () => {
  return (
    <div className='bg-syncbee h-screen w-full flex flex-col items-center py-20 px-28 gap-28'>
        <div className='w-full flex flex-row justify-between'>
            <h1 className='font-bold text-purple-900 text-3xl'>SyncBee</h1>
            <Link href='/signup'>
              <button className='bg-purple-500 hover:bg-transparent hover:shadow-md text-white hover:text-purple-900 font-bold py-2 px-4 rounded'>
                  Sign Up
              </button>
            </Link>
        </div>

        <div className='flex flex-col items-center gap-10'>
            <h2 className='text-purple-900 font-bold text-6xl'>Welcome to SyncBee</h2>
            <p className='text-purple-900 text-2xl'>The best way to sync your data</p>
        </div>
    </div>
  )
}

export default Hero
