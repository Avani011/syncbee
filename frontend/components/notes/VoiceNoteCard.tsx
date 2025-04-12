'use client';

import { useState } from 'react';

const VoiceNoteCard = ({ 
  note = { 
    id: Math.random().toString(36).substring(7),
    title: "Voice Note", 
    duration: "0:00",
    isRecording: false,
    audioUrl: null
  }
}) => {
  const [voiceNote, setVoiceNote] = useState(note);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Toggle recording state (for testing UI)
  const toggleRecording = () => {
    setVoiceNote({
      ...voiceNote,
      isRecording: !voiceNote.isRecording,
      duration: voiceNote.isRecording ? "1:30" : "Recording..."
    });
  };
  
  // Toggle play state (for testing UI)
  const togglePlay = () => {
    if (voiceNote.audioUrl) {
      setIsPlaying(!isPlaying);
    }
  };
  
  // Handle title change
  const handleTitleChange = (e) => {
    setVoiceNote({
      ...voiceNote,
      title: e.target.value
    });
  };
  
  // Handle delete
  const handleDelete = () => {
    console.log('Delete voice note:', voiceNote.id);
    alert('Delete functionality will be added when integrating with backend');
  };

  return (
    <div className="w-full h-10 flex items-center rounded-lg shadow-md ring-2 ring-purple-400 px-3 py-2">
      {/* Title */}
      <input 
        type="text"
        value={voiceNote.title}
        onChange={handleTitleChange}
        className="flex-grow mr-4 text-sm font-medium text-gray-800 focus:outline-none"
      />
      
      {/* Duration/Status */}
      <div className="text-xs text-gray-500 w-16 text-right mr-3">
        {voiceNote.isRecording ? "Recording..." : voiceNote.duration}
      </div>
      
      {/* Record/Play Button */}
      {voiceNote.audioUrl ? (
        // Play button for existing recordings
        <button 
          onClick={togglePlay}
          className={`h-6 w-6 rounded-full flex items-center justify-center ${isPlaying ? 'bg-purple-700' : 'bg-purple-600'} hover:bg-purple-700 mr-2`}
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </button>
      ) : (
        // Record button
        <button 
          onClick={toggleRecording}
          className={`h-6 w-6 rounded-full flex items-center justify-center ${voiceNote.isRecording ? 'bg-red-600 animate-pulse' : 'bg-purple-600'} hover:bg-purple-700 mr-2`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        </button>
      )}
      
      {/* Delete Button */}
      <button 
        onClick={handleDelete}
        className="text-red-600 hover:text-red-800"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
};

// Example of how to use it in a parent component
export default function VoiceNotesContainer() {
  const dummyVoiceNotes = [
    { id: "vn1", title: "Meeting notes", duration: "2:45", audioUrl: "#" },
    { id: "vn2", title: "Reminder for tomorrow", duration: "0:37", audioUrl: "#" },
    { id: "vn3", title: "New voice note", duration: "0:00", isRecording: false, audioUrl: null },
  ];

  return (
    <div className="flex flex-col gap-3 p-4">
      {dummyVoiceNotes.map(note => (
        <VoiceNoteCard key={note.id} note={note} />
      ))}
    </div>
  );
}