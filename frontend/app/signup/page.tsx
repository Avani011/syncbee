import React from 'react'
import Link from 'next/link'

const SignUp = () => {
  return (
    <div className='bg-syncbee h-screen w-full flex justify-center items-center'>
        <div className='flex flex-col gap-12 w-1/4 items-center'>
            <h1 className='text-4xl font-bold text-purple-900'>SignUp / Register</h1>
            
            <div className='w-full flex flex-col gap-6 items-center'>
                <div className='w-full flex flex-col gap-3'>
                    <h3 className='text-xl tex-purple-900'>Enter your Email Id</h3>
                    <div className='p-2 w-full h-16 border-2 border-purple-700 rounded-2xl'>
                        <input type="email" className='w-full h-full'/>
                    </div>
                </div>

                <div className='w-full flex flex-col gap-3'>
                    <h3 className='text-xl tex-purple-900'>Enter your Password</h3>
                    <div className='p-2 w-full h-16 border-2 border-purple-700 rounded-2xl'>
                        <input type="password" className='w-full h-full'/>
                    </div>
                </div>

                <Link href='/register' className='w-full'>
                    <button className='p-2 w-full h-16 rounded-2xl flex flex-row justify-center items-center gap-3 bg-purple-700 hover:bg-transparent hover:border-2 hover:border-purple-700 text-xl font-medium text-white hover:text-purple-900'>
                        SignUp
                    </button>
                </Link>

            </div>

            <div className=' w-full flex flex-row items-center gap-7'>
                <div className='w-1/2 h-1 bg-purple-700'></div>
                <h3 className='text-lg font-medium text-purple-900'>OR</h3>
                <div className='w-1/2 h-1 bg-purple-700'></div>
            </div>

            <button className='p-2 w-full h-16 rounded-2xl flex flex-row justify-center items-center gap-3 bg-purple-700 hover:bg-transparent hover:border-2 hover:border-purple-700 text-xl font-medium text-white hover:text-purple-900'>
                Sign up with Google
            </button>
            
        </div>
    </div>
  )
}

export default SignUp
