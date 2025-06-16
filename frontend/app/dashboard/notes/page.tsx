'use client';

import { useState, useEffect } from 'react';
import NoteCard from '@/components/notes/NoteCard';
import NoteExpandedModal from '@/components/notes/NoteExpandedModal';
import FabActions from '@/components/notes/FabActions';
import CreateNoteModal from '@/components/notes/CreateNoteModal';
import CreateVoiceModal from '@/components/notes/CreateVoiceModal';
import VoiceNoteCard from '@/components/notes/VoiceNoteCard';
import { getAllNotes, deleteNoteApi, updateNoteApi } from '@/services/note';

const NotePage = () => {
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [notes, setNotes] = useState([]); 
  const [expandedNote, setExpandedNote] = useState(null); 

  const fetchNotes = async () => {
    console.log('🔄 fetchNotes() called');
    try{
      const response = await getAllNotes();
      console.log('✅ Notes fetched:', response);
      if (Array.isArray(response?.data)) {
        setNotes(response.data);
      } else {
        console.warn('⚠️ Unexpected response structure:', response);
        setNotes([]);
      }
    }
    catch (error) {
      console.error("Error fetching Notes:", error);
    }
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="flex flex-row gap-2.5 p-2.5 h-full">
      {/* 📘 Notes */}
      <div className="flex flex-col gap-5 w-2/3 h-full shadow-md rounded-lg p-3">
        <h1 className="flex justify-center text-xl text-center text-[#54405e] font-bold">Notes</h1>
        <div className="flex flex-row gap-3 flex-wrap">
          {Array.isArray(notes) && notes.map((note) => (
            <NoteCard key={note._id} note={note} onClick={() => setExpandedNote(note)} />
          ))}
        </div>
      </div>

      {/* 🎙 Voice Notes */}
      <div className="flex flex-col gap-5 h-full shadow-md rounded-lg p-4">
        <h1 className="flex justify-center text-xl text-center text-[#54405e] font-bold">Voice Notes</h1>
        <VoiceNoteCard />
      </div>

      {/* ➕ Floating Actions */}
      <FabActions
        onNoteClick={() => setShowNoteModal(true)}
        onVoiceClick={() => setShowVoiceModal(true)}
      />

      {/* 📝 Modals */}
      {showNoteModal && <CreateNoteModal onClose={() => {setShowNoteModal(false); fetchNotes();}} />}
      {showVoiceModal && <CreateVoiceModal onClose={() => setShowVoiceModal(false)} />}
      {expandedNote && (
        <NoteExpandedModal
        note={expandedNote}
        onClose={() => setExpandedNote(null)}
        onSave={async (formData, noteId) => {
          try {
            await updateNoteApi(noteId, formData);
            await fetchNotes(); // refresh notes after update
            setExpandedNote(null); // close modal
          } catch (error) {
            console.error('❌ Error updating note:', error);
          }
        }}
        onDelete={async (noteId) => {
          try {
            await deleteNoteApi(noteId);
            await fetchNotes();
            setExpandedNote(null);
          } catch (error) {
            console.error('❌ Error deleting note:', error);
          }
        }}
      />
      
      )}

    </div>
  );
};

export default NotePage;
