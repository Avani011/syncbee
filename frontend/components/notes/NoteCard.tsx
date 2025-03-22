'use client';

import { useState } from 'react';

const NoteCard = ({ initialNote = { 
  id: Math.random().toString(36).substring(7),
  title: "Untitled Note", 
  content: "", 
  checklist: []
}}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [note, setNote] = useState(initialNote);
  const [newChecklistItem, setNewChecklistItem] = useState('');

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleTitleChange = (e) => {
    setNote({...note, title: e.target.value});
  };

  const handleContentChange = (e) => {
    setNote({...note, content: e.target.value});
  };

  const addChecklistItem = () => {
    if (newChecklistItem.trim()) {
      setNote({
        ...note,
        checklist: [...(note.checklist || []), {
          id: Date.now().toString(),
          text: newChecklistItem,
          completed: false
        }]
      });
      setNewChecklistItem('');
    }
  };

  const toggleChecklistItem = (itemId) => {
    setNote({
      ...note,
      checklist: note.checklist.map(item => 
        item.id === itemId ? {...item, completed: !item.completed} : item
      )
    });
  };

  // Collapsed card view
  if (!isExpanded) {
    return (
      <div 
        className="rounded-lg shadow-md p-2.5 w-[30%] h-40 overflow-hidden ring-2 ring-purple-400 cursor-pointer hover:shadow-lg transition-shadow flex flex-col"
        onClick={toggleExpand}
      >
        <h3 className="font-medium text-gray-800 mb-2 truncate">{note.title}</h3>
        <p className="text-gray-600 text-sm line-clamp-2 flex-grow">{note.content}</p>
        {note.checklist && note.checklist.length > 0 && (
          <div className="mt-auto text-xs text-gray-500">
            {note.checklist.filter(item => item.completed).length}/{note.checklist.length} completed
          </div>
        )}
      </div>
    );
  }

  // Expanded view with options
  return (
    <div className="fixed inset-0 bg-[#d9d9d9]/80 backdrop-blur-xs bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={toggleExpand}>
      <div 
        className="bg-white rounded-lg shadow-xl ring-2 ring-purple-600 w-full max-w-md overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title section */}
        <div className="p-4 border-b-2 border-b-purple-600">
          <input 
            type="text" 
            value={note.title} 
            onChange={handleTitleChange}
            className="w-full text-lg font-medium focus:outline-none" 
            placeholder="Title"
          />
        </div>
        
        {/* Content section */}
        <div className="p-4 max-h-64 overflow-y-auto flex-grow">
          <textarea 
            className="w-full min-h-[100px] resize-none focus:outline-none text-gray-700" 
            placeholder="Add your note here..."
            value={note.content}
            onChange={handleContentChange}
          ></textarea>
          
          {/* Checklist section */}
          {note.checklist && note.checklist.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Checklist</h4>
              <div className="space-y-2">
                {note.checklist.map(item => (
                  <div key={item.id} className="flex items-center">
                    <input 
                      type="checkbox" 
                      checked={item.completed}
                      onChange={() => toggleChecklistItem(item.id)} 
                      className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className={`ml-2 text-sm ${item.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Action buttons */}
        <div className="flex justify-between items-center p-4 border-t-2 border-t-purple-600 bg-gray-50">
          <div className="flex space-x-4">
            <button 
              className="text-gray-600 hover:text-gray-900" 
              title="Add Image"
              onClick={() => alert('Image upload will be added when integrating with backend')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>
            <button 
              className="text-gray-600 hover:text-gray-900" 
              title="Add Checkbox"
              onClick={() => document.getElementById('checklist-input').focus()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
          
          <div className="flex space-x-2">
            <button 
              className="text-red-600 hover:text-red-800" 
              title="Delete Note"
              onClick={() => {
                alert('Delete functionality will be integrated with backend later');
                toggleExpand();
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
            <button 
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              onClick={() => {
                console.log('Note saved (test only):', note);
                toggleExpand();
              }}
            >
              Save
            </button>
          </div>
        </div>
        
        {/* Add checklist item form */}
        <div className="p-4 border-t-2 border-t-purple-600 flex">
          <input
            id="checklist-input"
            type="text"
            placeholder="Add checklist item..."
            value={newChecklistItem}
            onChange={(e) => setNewChecklistItem(e.target.value)}
            className="flex-1 p-2 border rounded-l-md focus:outline-none focus:ring-1 focus:ring-purple-500"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                addChecklistItem();
              }
            }}
          />
          <button
            onClick={addChecklistItem}
            className="px-4 py-2 bg-purple-600 text-white rounded-r-md hover:bg-purple-700"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

// Example of how to use it in a parent component
export default function NotesContainer() {
  return (
    <div className="flex flex-wrap gap-4 p-4">
      <NoteCard initialNote={{ 
        id: "note1", 
        title: "Project Meeting", 
        content: "Discuss development timeline and resource allocation",
        checklist: [
          { id: "check1", text: "Prepare slides", completed: true },
          { id: "check2", text: "Schedule meeting room", completed: false }
        ]
      }} />
      
      <NoteCard initialNote={{ 
        id: "note2", 
        title: "Shopping List", 
        content: "Things to buy for the week",
        checklist: [
          { id: "check3", text: "Groceries", completed: false },
          { id: "check4", text: "New headphones", completed: false }
        ]
      }} />
      
      <NoteCard initialNote={{ 
        id: "note3", 
        title: "Ideas", 
        content: "Random thoughts and inspirations",
        checklist: []
      }} />
    </div>
  );
}