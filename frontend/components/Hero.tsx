import React from 'react'

const Hero = () => {
  return (
    <div className='bg-syncbee h-screen w-full flex flex-col justify-center items-center'>
      <div className='flex flex-row justify-between'>
        <h1 className='font-bold text-purple-900 text-3xl'>SyncBee</h1>
        <button className='bg-purple-500 hover:bg-transparent text-white hover:text-purple-900 font-bold py-2 px-4 rounded'>
            Sign Up
        </button>
      </div>

      <div>
        <h2 className='text-purple-900 text-2xl'>Welcome to SyncBee</h2>
        <p className='text-purple-900 text-lg'>The best way to sync your data</p>
      </div>
    </div>
  )
}

export default Hero
