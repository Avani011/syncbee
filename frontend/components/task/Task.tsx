'use client'
import Link from "next/link"

const Task = () => {
  return (
<div className='flex flex-row gap-8'>
        <div className='w-1/5 rounded-xl flex flex-col h-[100%] shadow-md pt-5'>
            <div className='shadow-lg py-3 rounded-lg flex justify-center items-center'>
                <Link href='/'>
                    <h1 className='text-xl font-medium text-purple-800 text-center'>Active Tasks</h1>
                </Link>
                </div>

                <div className='shadow-lg py-6 rounded-lg'>
                <Link href='/'>
                    <h1 className='text-xl font-medium text-purple-800 text-center'>Completed Tasks</h1>
                </Link>
                </div>

                <div className='shadow-lg py-6 rounded-lg'>
                <Link href='/'>
                    <h1 className='text-xl font-medium text-purple-800 text-center'>Incomplete Tasks</h1>
                </Link>
                </div>

                <div className='shadow-lg py-6 rounded-lg'>
                <Link href='/'>
                    <h1 className='text-xl font-medium text-purple-800 text-center'>Priority (High to Low)</h1>
                </Link>
                </div>

                <div className='shadow-lg py-6 rounded-lg'>
                <Link href='/'>
                    <h1 className='text-xl font-medium text-purple-800 text-center'>Priority (Low to High)</h1>
                </Link>
            </div>
        </div>

        <div className="flex flex-col w-4/5 shadow-md rounded-xl">
            <div className="flex flex-row h-[10%]">
                <div className=" flex justify-center items-center rounded-t-lg">
                    <h1 className="text-md font-medium text-purple-800 text-center p-2">Work</h1>
                </div>
                <div className=" flex justify-center items-center rounded-t-lg shadow-sm">
                    <h1 className="text-md font-medium text-purple-800 text-center p-2">Personal</h1>
                </div>
            </div>
            <div className="flex flex-row w-full gap-8 px-4 py-3">
                <div className="flex flex-row w-1/2 justify-between p-3 shadow-md rounded-md">
                    <div className="flex items-center gap-2">
                        <input 
                            type="checkbox" 
                            id="task1-checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 peer"
                            onChange={(e) => {
                                // You can add additional logic here if needed
                            }}
                        />
                        <h1 className="text-lg font-medium text-purple-800 peer-checked:line-through peer-checked:text-gray-500 transition-all">Task1</h1>
                    </div>
                    <div className="flex flex-row gap-3">
                        <div className="flex justify-center items-center rounded-lg p-1.5 bg-purple-400">
                            <h1 className="text-black text-xs">High</h1>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row w-1/2 justify-between p-3 shadow-md rounded-md">
                    <div className="flex items-center gap-2">
                        <input 
                            type="checkbox" 
                            id="task2-checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 peer"
                            onChange={(e) => {
                                // You can add additional logic here if needed
                            }}
                        />
                        <h1 className="text-lg font-medium text-purple-800 peer-checked:line-through peer-checked:text-gray-500 transition-all">Task2</h1>
                    </div>
                    <div className="flex flex-row gap-3">
                        <div className="flex justify-center items-center rounded-lg p-1.5 bg-purple-400">
                            <h1 className="text-black text-xs">High</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Task
