'use client'

import NoteCard from '@/components/notes/NoteCard'
import FabActions from '@/components/notes/FabActions'
import React from 'react'
import VoiceNoteCard from '../../../components/notes/VoiceNoteCard'
import { useState } from 'react'
import CreateNoteModal from '../../../components/notes/CreateNoteModal'
import CreateVoiceModal from '../../../components/notes/CreateVoiceModal'

const Note = () => {
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showVoiceModal, setShowVoiceModal] = useState(false);

  return (
    <div className='flex flex-row gap-2.5 p-2.5 h-full'>
      <div className='flex flex-col gap-5 w-2/3 h-full shadow-md rounded-lg p-3'>
        <h1 className='flex justify-center text-xl text-center text-[#54405e] font-bold'>Notes</h1>
        <div className='flex flex-row gap-3'>
            <NoteCard />
        </div>
      </div>

      <div className='flex flex-col gap-5 h-full shadow-md rounded-lg p-4'>
        <h1 className='flex justify-center text-xl text-center text-[#54405e] font-bold'>Voice Notes</h1>
        <div className='flex flex-row gap-3'>
            <VoiceNoteCard />
        </div>
      </div>

      <FabActions
        onNoteClick={() => setShowNoteModal(true)}
        onVoiceClick={() => setShowVoiceModal(true)}
      />

      {showNoteModal && (
        <CreateNoteModal onClose={() => setShowNoteModal(false)} />
      )}

      {showVoiceModal && (
        <CreateVoiceModal onClose={() => setShowVoiceModal(false)} />
      )}
    </div>
  )
}

export default Note
