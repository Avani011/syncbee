'use client';

const NoteCard = ({ note, onClick }) => {
  if (!note) return null;

  return (
    <div
      onClick={onClick}
      className="rounded-lg shadow-md p-2.5 w-[30%] h-40 overflow-hidden ring-2 ring-purple-400 cursor-pointer hover:shadow-lg transition-shadow flex flex-col"
    >
      <h3 className="font-medium text-gray-800 mb-2 truncate">{note.title}</h3>
      <p className="text-gray-600 text-sm line-clamp-2 flex-grow">{note.description}</p>
      {note.checklist?.length > 0 && (
        <div className="mt-auto text-xs text-gray-500">
          {note.checklist.filter((item) => item.isTicked).length}/{note.checklist.length} completed
        </div>
      )}
    </div>
  );
};

export default NoteCard;
