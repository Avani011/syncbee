'use client';

import { useState } from 'react';
import NoteCard from '@/components/notes/NoteCard';
import NoteExpandedModal from '@/components/notes/NoteExpandedModal';
import FabActions from '@/components/notes/FabActions';
import CreateNoteModal from '@/components/notes/CreateNoteModal';
import CreateVoiceModal from '@/components/notes/CreateVoiceModal';
import VoiceNoteCard from '@/components/notes/VoiceNoteCard';
import mockNotes from '@/data/mockNotes';

const NotePage = () => {
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showVoiceModal, setShowVoiceModal] = useState(false);

  const [expandedNote, setExpandedNote] = useState(null); // ✅ store selected note for modal

  return (
    <div className="flex flex-row gap-2.5 p-2.5 h-full">
      {/* 📘 Notes */}
      <div className="flex flex-col gap-5 w-2/3 h-full shadow-md rounded-lg p-3">
        <h1 className="flex justify-center text-xl text-center text-[#54405e] font-bold">Notes</h1>
        <div className="flex flex-row gap-3 flex-wrap">
          {mockNotes.map((note) => (
            <NoteCard key={note.id} note={note} onClick={() => setExpandedNote(note)} />
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
      {showNoteModal && <CreateNoteModal onClose={() => setShowNoteModal(false)} />}
      {showVoiceModal && <CreateVoiceModal onClose={() => setShowVoiceModal(false)} />}
      {expandedNote && (
        <NoteExpandedModal
          note={expandedNote}
          onClose={() => setExpandedNote(null)}
        />
      )}
    </div>
  );
};

export default NotePage;
