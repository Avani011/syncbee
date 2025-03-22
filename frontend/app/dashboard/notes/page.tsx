import NoteCard from '@/components/notes/NoteCard'
import React from 'react'

const Note = () => {
  return (
    <div className='flex flex-row gap-2.5 p-2.5 h-full'>
      <div className='flex flex-col gap-5 w-2/3 h-full shadow-md rounded-lg p-3'>
        <h1 className='flex justify-center text-xl text-center text-[#54405e] font-bold'>Notes</h1>
        <div className='flex flex-row gap-3'>
            <NoteCard />
        </div>
      </div>

      <div className='flex flex-col gap-5 w-1/2 h-full shadow-md rounded-lg p-4'>
        <h1 className='flex justify-center text-xl text-center text-[#54405e] font-bold'>Voice Notes</h1>
        <div className='flex flex-row gap-3'>
            
        </div>
      </div>
    </div>
  )
}

export default Note
